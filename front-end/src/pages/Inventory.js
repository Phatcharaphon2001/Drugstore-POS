
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import DataTable from '../components/DataTable';
import Button from 'react-bootstrap/Button';
import FormDialog from '../components/FormDialog'





export default class Inventory extends Component {
  render() {

    return (
      <>
      <div style={{display: 'flex',justifyContent: 'end'}}>
      
      <FormDialog/>
      </div>
      
      <DataTable />
      
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
 