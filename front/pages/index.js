import { Card, Icon, Avatar, Input, Button, Form } from 'antd';

const dummy = [{
  img: null,
  User: {
    name: '제로초',
  },
  content: '#졸리다 #하아아암',
  createdAt: new Date(),
}, {
  img: 'https://pbs.twimg.com/media/D343EC-WwAEwh-B.jpg',
  User: {
    name: '제로초',
  },
  content: '@제로초 졸리다 #하아아암 zerocho.com',
  createdAt: new Date(),
}];

const Home = () => {
  return (
    <div>
      <Form style={{ marginBottom: 20 }}>
        <Input.TextArea placeholder="어떤 신기한 일이 있었나요? " />
        <div>
          <Button>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }}>짹짹</Button>
        </div>

      </Form>
      {dummy.map((c, i) => {
        return (
          <Card
            key={+c.createdAt + i}
            cover={c.img && <img alt="example" src={c.img} />}
            actions={[<Icon type="retweet" />, <Icon type="heart" />, <Icon type="message" />, <Icon type="ellipsis" />]}
            style={{ marginBottom: 20 }}
          >

            <Card.Meta
              avatar={<Avatar>{c.User.name[0]}</Avatar>}
              title={c.User.name}
              description={c.content}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
