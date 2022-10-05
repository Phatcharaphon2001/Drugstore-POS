
import React, { Component } from 'react';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';





export default class Inventory extends Component {
  render() {

let products = [
  {
    id: 1,
    productName: 'Drug',
    catagory: 'vitamin',
    cost: 50,
    sell: 65,
    title: 'Create an example',
    description: 'Create an example of how to use the component',
  },
  {
    id: 2,
    productName: 'yaya',
    catagory: 'water',
    cost: 12,
    sell: 20,
    title: 'asdasdasdad',
    description: 'Hi',
  },
  {
    id: 3,
    productName: 'cat',
    catagory: 'fatcat',
    cost: 2,
    sell: 4,
    title: 'asdasdasdad',
    description: 'Hi',
  },
  {
    id: 4,
    productName: 'crystal',
    catagory: 'water',
    cost: 8,
    sell: 10,
    title: 'asssssssd',
    description: 'Hi hi',
  },
  {
    id: 5,
    productName: 'lamp',
    catagory: 'light',
    cost: 100,
    sell: 200,
    title: 'asdasdasdadsssssss',
    description: 'Hi12312312',
  }
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id'|| data.field === "cost"|| data.field === "sell") {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }
  return sorter;
};

let count = products.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(products);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (product) => {
    count += 1;
    products.push({
      ...product,
      id: count,
    });
    return Promise.resolve(product);
  },
  update: (data) => {
    const product = products.find(t => t.id === data.id);
    product.productName = data.productName;
    product.catagory = data.catagory;
    product.cost = data.cost;
    product.sell = data.sell;
    
    return Promise.resolve(product);
  },
  delete: (data) => {
    const product = products.find(t => t.id === data.id);
    products = products.filter(t => t.id !== product.id);
    return Promise.resolve(product);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Inventory"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="productName"
          label="Product Name"
        />
        <Field
          name="catagory"
          label="Catagory"
        />
        <Field
          name="cost"
          label="Cost Price"   
          
        />
        <Field
          name="sell"
          label="Sell price"
        />
      </Fields>
      <CreateForm
        title="Add a new product"
        message="Create a new product"
        trigger="+ADD Product"           //btn create Form 
        onSubmit={product => service.create(product)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.productName) {
            errors.productName = 'Please, provide product name';
          }

          if (!values.catagory) {
            errors.catagory = 'Please, provide catagory';
          }

          if (!values.cost) {
            errors.cost = 'Please, provide cost price';
          }

          if (!values.sell) {
            errors.sell = 'Please, provide sell price';
          }


          return errors;
        }}
      />

      <UpdateForm
        title="Update Product"
        message="Update product"
        trigger="Update"
        onSubmit={product => service.update(product)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Please, provide id';
          }

          if (!values.productName) {
            errors.productName = 'Please, provide product name';
          }

          if (!values.catagory) {
            errors.catagory = 'Please, provide catagory';
          }

          if (!values.cost) {
            errors.cost = 'Please, provide cost price';
          }

          if (!values.sell) {
            errors.sell = 'Please, provide sell price';
          }


          return errors;
        }}
      />

      <DeleteForm
        title="delete product"
        message="Are you sure you want to delete the product?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

Example.propTypes = {};

    return (
      <>
      <Example/>
      
      </>
      // <Container>
      //   <h1>Inventory</h1>
      //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar aliquam ante, ut euismod felis malesuada vel. In nec gravida lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In maximus ornare odio non vestibulum. Maecenas sed accumsan quam. Quisque id finibus urna, eget elementum turpis. Cras convallis lorem non lectus dapibus rhoncus. Nulla at massa augue. Etiam lacus elit, malesuada vel ipsum consequat, volutpat molestie leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat euismod laoreet. Donec feugiat risus libero, eu euismod risus auctor a. Morbi fermentum elit non nisl sodales mattis ut convallis lorem. Morbi mattis malesuada massa, vel elementum dolor auctor quis. Nunc varius neque a magna pulvinar vestibulum.</p>
      //     <p>Cras hendrerit turpis a nibh consequat faucibus. Vestibulum bibendum nec nibh eu tempor. Mauris at velit nunc. Aliquam consectetur suscipit magna nec lobortis. Nunc vel diam eget tellus blandit imperdiet ut eu erat. In aliquet sodales sapien, eu pharetra lorem pulvinar vitae. Cras ut dapibus turpis. Vestibulum sagittis rutrum lectus, ac luctus metus faucibus in. Cras semper erat ut ex varius, a dapibus urna vehicula. Vivamus ultricies dolor et erat pulvinar, at pharetra ligula ornare. Aliquam erat volutpat. Nunc bibendum hendrerit ante, et venenatis eros auctor ut. Cras vitae pulvinar justo, sed auctor elit. Integer quis nibh nec sem ultrices mollis quis vel tellus.</p>
      //     <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac sapien a erat aliquet faucibus in in nunc. Vivamus venenatis in est at iaculis. Curabitur est felis, gravida nec dui in, pretium malesuada urna. Pellentesque tortor diam, laoreet et odio vel, hendrerit venenatis metus. Praesent a augue a leo tincidunt vestibulum non eu mi. Sed non dolor non lectus porttitor feugiat sit amet id enim. Suspendisse malesuada erat eget quam tempus tempus vel sed mi. Ut dictum felis consequat, viverra felis eu, maximus sem. Suspendisse porta odio id neque mollis, ac consequat nunc porttitor. Integer vel dui dapibus lectus consectetur tempus vitae ac purus. Quisque non ultricies massa, at condimentum nibh. Praesent quis ligula sem. Nullam tincidunt ultricies feugiat. Maecenas magna quam, pretium laoreet congue sed, pellentesque non enim. Quisque accumsan tortor justo.</p>
      //     <p>Sed id ipsum at sapien tempus vehicula vel eu velit. Etiam malesuada lacinia dolor, a consectetur ipsum tempor pretium. Duis sed orci odio. Aenean euismod metus consectetur blandit rutrum. Curabitur gravida eleifend feugiat. Cras consectetur felis et nisi rutrum aliquet. Sed a sollicitudin velit. Nam ac risus sed enim placerat eleifend. In id elit felis. Duis ornare eros vel dui malesuada convallis.</p>
      //     <p>Aenean volutpat eu odio nec sagittis. Phasellus interdum scelerisque mi, a vulputate sem varius non. Phasellus ornare, justo et tempor ornare, orci nisi iaculis lectus, quis lobortis eros odio eget magna. Integer in quam sed risus mattis sodales quis in turpis. Curabitur id lorem eu libero mattis pharetra. Aliquam pretium nunc nunc. In porta eu enim ut volutpat. Nunc magna dolor, lacinia sed eleifend eget, vulputate id felis. Aliquam odio est, rhoncus eu egestas quis, imperdiet in nisi. Donec malesuada sagittis turpis, ac scelerisque ligula aliquet ut. Integer molestie porta consectetur. Morbi dapibus, purus sit amet volutpat volutpat, sem dolor vulputate mauris, et tempus sapien nibh sed erat. Nulla cursus ligula nisi, vitae vehicula augue congue ac. Quisque in elit mi.</p>
      // </Container>
    )
  }
}
 