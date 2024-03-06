import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Hheader from "./components/Hheader";
import Footer from "./components/Footer";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  {
    id: 1,
    nombre_libro: "Codigo Da Vinci",
    nombre_autor: "Dan",
    apellido_autor: "Brown",
    fecha_nacimiento: "22-06-1964",
    fecha_fallecimiento: "",
    genero_libro: "novela policíaca/ficción",
    fecha_publicacion: "01-04-2003",
    editorial: "Random House",
    foto_portada: "",
  },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      nombre_libro: "",
      nombre_autor: "",
      apellido_autor: "",
      fecha_nacimiento: "",
      fecha_fallecimiento: "",
      genero_libro: "",
      fecha_publicacion: "",
      editorial: "",
      foto_portada: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  
  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar = (Registro) => {
    this.setState({ modalEditar: true, form: Registro });
  };


  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar=()=>{
    var valornuevo={...this.state.form};
    valornuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valornuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((Registro)=>{
      if(dato.id==Registro.id){
        lista[contador].nombre_libro=dato.nombre_libro;
        lista[contador].nombre_autor=dato.nombre_autor;
        lista[contador].apellido_autor=dato.apellido_autor;
        lista[contador].fecha_nacimiento=dato.fecha_nacimiento;
        lista[contador].fecha_fallecimiento=dato.fecha_fallecimiento;
        lista[contador].genero_libro=dato.genero_libro;
        lista[contador].fecha_publicacion=dato.fecha_publicacion;
        lista[contador].editorial=dato.editorial;
        lista[contador].foto_portada=dato.foto_portada;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  eliminar=(dato)=>{
    var opcion=window.confirm("Quiere eliminar el registro?" +dato.id);
    if(opcion){
      var contador=0;
      var lista = this.state.data;
      lista.map((Registro)=>{
        if(Registro.id==dato.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data: lista});
    }
  }




  render() {
    return (
      <>
        <Hheader></Hheader>
        <Container>
          <br />
          <br />
          <Button color="warning" onClick={()=>this.mostrarModalInsertar()}>
            Insertar nuevo libro
          </Button>
          <br />
          <br />

          <Table>
            <thead>
              <tr>
                <th>Nombre del libro: </th>
                <th>Nombre del Autor</th>
                <th>Apellido del autor</th>
                <th>Fecha de nacimiento del autor</th>
                <th>Fecha de fallecimiento</th>
                <th>Genero del libro</th>
                <th>Fecha de publicacion</th>
                <th>Editorial</th>
                <th>Foto portada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.nombre_libro}</td>
                  <td>{elemento.nombre_autor}</td>
                  <td>{elemento.apellido_autor}</td>
                  <td>{elemento.fecha_nacimiento}</td>
                  <td>{elemento.fecha_fallecimiento}</td>
                  <td>{elemento.genero_libro}</td>
                  <td>{elemento.fecha_publicacion}</td>
                  <td>{elemento.editorial}</td>
                  <td>{elemento.foto_portada}</td>
                  <td>
                    <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                  </td>
                  <td>
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text" value={this.state.form.id}
                
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre del libro</label>
              <input
                className="form-control"
                name="nombre_libro"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_libro}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre del Autor</label>
              <input
                className="form-control"
                name="nombre_autor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_autor}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido del Autor</label>
              <input
                className="form-control"
                name="apellido_autor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido_autor}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de nacimiento del autor</label>
              <input
                className="form-control"
                name="fecha_nacimiento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_nacimiento}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de fallecimiento del autor</label>
              <input
                className="form-control"
                name="fecha_fallecimiento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_fallecimiento}
              />
            </FormGroup>

            <FormGroup>
              <label>Genero del libro</label>
              <input
                className="form-control"
                name="genero_libro"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.genero_libro}
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha de publicación</label>
              <input
                className="form-control"
                name="fecha_publicacion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_publicacion}
              />
            </FormGroup>

            <FormGroup>
              <label>Editorial</label>
              <input
                className="form-control"
                name="editorial"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.editorial}
              />
            </FormGroup>

            <FormGroup>
              <label>Foto de portada</label>
              <input
                className="form-control"
                name="foto_portada"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.foto_portada}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary" onClick={()=>this.insertar()}
            
            >
              Insertar
            </Button>
            <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        



        <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text" value={this.state.form.id}
                
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre del libro</label>
              <input
                className="form-control"
                name="nombre_libro"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_libro}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre del Autor</label>
              <input
                className="form-control"
                name="nombre_autor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_autor}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido del Autor</label>
              <input
                className="form-control"
                name="apellido_autor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido_autor}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de nacimiento del autor</label>
              <input
                className="form-control"
                name="fecha_nacimiento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_nacimiento}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de fallecimiento del autor</label>
              <input
                className="form-control"
                name="fecha_fallecimiento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_fallecimiento}
              />
            </FormGroup>

            <FormGroup>
              <label>Genero del libro</label>
              <input
                className="form-control"
                name="genero_libro"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.genero_libro}
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha de publicación</label>
              <input
                className="form-control"
                name="fecha_publicacion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_publicacion}
              />
            </FormGroup>

            <FormGroup>
              <label>Editorial</label>
              <input
                className="form-control"
                name="editorial"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.editorial}
              />
            </FormGroup>

            <FormGroup>
              <label>Foto de portada</label>
              <input
                className="form-control"
                name="foto_portada"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.foto_portada}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary" onClick={()=>this.editar(this.state.form)}
            
            >
              Editar
            </Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>





        
        <Footer></Footer>
      </>
    );
  }
}

export default App;

/*







 */
