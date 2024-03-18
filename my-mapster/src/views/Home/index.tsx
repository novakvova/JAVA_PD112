import {Button, Col, Collapse, Form, Input, Pagination, Row} from "antd";
import {useSearchParams} from "react-router-dom";
import {ICategorySearch, IGetCategories} from "../../components/admin/category/types.ts";
import http_common from "../../http_common.ts";
import {useEffect, useState} from "react";
import CategoryCard from "./CategoryCard.tsx";

const HomePage = () => {
    const [data, setData] = useState<IGetCategories>({
        list: [],
        totalCount: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [formParams, setFormParams] = useState<ICategorySearch>({
        keyword: searchParams.get('keyword') || "",
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 8
    });

    const [form] = Form.useForm<ICategorySearch>();

    const onSubmit = async (values: ICategorySearch) => {
        findCategories({...formParams, page: 1, keyword: values.keyword});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    await http_common.get<IGetCategories>(`/api/categories/search?keyword=${formParams.keyword}&page=${(formParams.page - 1)}&size=${formParams.size}`);
                console.log("response.data", response.data)
                setData(response.data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        // setLoading(true);
        fetchData();
    }, [JSON.stringify(formParams)]);

    const {list, totalCount} = data;

    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({...formParams, page, size: newPageSize});
    };

    const findCategories = (model: ICategorySearch) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params: ICategorySearch) => {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            <h1 style={{textAlign: "center"}}>Список категорій</h1>

            <Collapse defaultActiveKey={0}>
                <Collapse.Panel key={1} header={"Панель пошуку"}>
                    <Row gutter={16}>
                        <Form form={form}
                              onFinish={onSubmit}
                              layout={"vertical"}
                              style={{
                                  minWidth: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  padding: 20,
                              }}
                        >
                            <Form.Item
                                label="Назва"
                                name="keyword"
                                htmlFor="keyword"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Button style={{margin: 10}} type="primary" htmlType="submit">
                                    Пошук
                                </Button>
                                <Button style={{margin: 10}} htmlType="button" onClick={() => {
                                }}>
                                    Скасувати
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                </Collapse.Panel>
            </Collapse>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={formParams.page}
                    pageSize={formParams.size}
                    total={totalCount}
                    onChange={handlePageChange}
                    pageSizeOptions={[4, 8, 12, 20]}
                    showSizeChanger
                />
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {list.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            list.map((item) =>
                                <CategoryCard key={item.id} item={item} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={formParams.page}
                    pageSize={formParams.size}
                    total={totalCount}
                    onChange={handlePageChange}
                    pageSizeOptions={[4, 8, 12, 20]}
                    showSizeChanger
                />
            </Row>
        </>
    );
}

export default HomePage;