import {ICategoryItem} from "../types.ts";
import {Button, Card, Col, Popconfirm, Typography} from "antd";
import {APP_ENV} from "../../../../env";
import NotImage from '../../../../assets/imagenot.png';
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem,
    handleDelete: (id: number) => void
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item, handleDelete} = props;
    const {id, name, description, image} = item;


    return (
        <>
            <Col style={{padding: 10}} xxl={4} lg={6} md={8} sm={12}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 380, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    cover={
                        <img
                            style={{height: '150px', objectFit: 'contain'}}
                            alt={name}
                            src={image ? `${APP_ENV.BASE_URL}/uploading/300_${image}` : NotImage}
                        />
                    }
                    actions={[
                        <Link to={`/category/edit/${id}`}>
                            <Button type="primary" icon={<EditOutlined/>}>
                                Змінить
                            </Button>
                        </Link>,

                        <Popconfirm
                            title="Are you sure to delete this category?"
                            onConfirm={() => handleDelete(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined/>}>
                                Delete
                            </Button>
                        </Popconfirm>
                    ]}
                >

                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{description.substring(0, 35)} ...</Title>
                        }
                    />
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;