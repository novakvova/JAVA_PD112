import {ICategoryItem} from "../../components/admin/category/types.ts";
import {Card, Col,  Typography} from "antd";
import {APP_ENV} from "../../env";
import NotImage from '../../assets/imagenot.png';
import Meta from "antd/es/card/Meta";

const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item} = props;
    const {name, description, image} = item;

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