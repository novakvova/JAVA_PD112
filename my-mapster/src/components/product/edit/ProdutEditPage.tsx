import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, message, Row, Select, Upload, UploadFile} from "antd";
import {useEffect, useState} from "react";
import http_common from "../../../http_common.ts";
import {IProductCreate, IProductEdit, IProductItem, IProductSearch} from "../types.ts";
import {APP_ENV} from "../../../env";
import {ISelectItem} from "../../helpers/types.ts";
import TextArea from "antd/es/input/TextArea";
import {UploadChangeParam} from "antd/es/upload";
import {IUploadedFile} from "../../category/types.ts";
import {PlusOutlined} from "@ant-design/icons";


const ProductEditPage : React.FC = () => {
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const [categories, setCategories] = useState<ISelectItem[]>([]);

    const {id} = useParams();

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [product, setProduct] = useState<IProductItem>({
        id: 0,
        name: "",
        description: "",
        files: [],
        price: 0,
        category_id: 0
    });

    useEffect(() => {
        http_common.get<IProductItem>(`/api/products/${id}`)
            .then(resp=> {
                //console.log("product info", resp.data);
                setProduct(resp.data);
            });

        http_common.get<ISelectItem[]>("/api/categories/names")
            .then(resp=> {
                //console.log("list categories", resp.data);
                setCategories(resp.data);
            });
    },[id]);

    useEffect(() => {
        setDefaultData(product);
    }, [product]);

    const [form] = Form.useForm<IProductEdit>();

    const setDefaultData = (data: IProductItem | null) => {
        if (data) {
            if (data.files?.length){
                setFileList([]);
            }
            const newFileList : UploadFile[] = [];
            for (let i = 0; i < data.files.length; i++) {
                newFileList.push({
                    uid: data.files[i],
                    name: data.files[i],
                    status: 'done',
                    url: `${APP_ENV.BASE_URL}/uploading/upload/300_${data.files[i]}`,
                });
            }
            setFileList(newFileList);
            const formattedPrice = String(data.price).replace('.', ',');
            form.setFieldsValue({
                ...data,
                price: formattedPrice,
            });
        }
    };

    const onSubmit = async (values: IProductEdit) => {
        console.log("data submit", values);
    }

    const optionsData = categories?.map(item => ({label: item.name, value: item.id}));

    return (
        <>
            <h1>Редагування продукта</h1>

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
                        label="Name"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 3, message: 'Name must have at least 3 symbols!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        htmlFor="price"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 3, message: 'Name must have at least 3 symbols!'},
                        ]}
                    >
                        <Input autoComplete="price"/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 10, message: 'Name must have at least 10 symbols!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>


                    <Form.Item
                        label="Категорія"
                        name="category_id"
                        htmlFor="category_id"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Select
                            placeholder="Оберіть категорію: "
                            options={optionsData}
                        />
                    </Form.Item>



                    <Form.Item
                        name="files"
                        label="Images"
                        valuePropName="files"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                        rules={[{required: true, message: 'Choose image for category!'}]}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={10}
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ navigate('/')}}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>

        </>
    )
}

export default ProductEditPage;