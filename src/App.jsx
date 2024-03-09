import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Hheader from "./components/Hheader";
import Footer from "./components/Footer";

import { useForm } from 'react-hook-form';

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



class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      
      data: [
        {
          id: 1,
          nombre_libro: "Codigo da vinci",
          nombres_autor: "Dan Brown",
          fecha_nacimiento: "1964-06-22",
          fecha_fallecimiento: "",
          genero_libro: "novela policíaca/ficción",
          fecha_publicacion: "2003-04-01",
          editorial: "Random House",
          foto_portada: "",
        },
        {
          id: 2,
          nombre_libro: "Fortaleza Digital",
          nombres_autor: "Dan Brown",
          fecha_nacimiento: "1964-06-22",
          fecha_fallecimiento: "",
          genero_libro: "Misterio/Ciencia ficción",
          fecha_publicacion: "1998-02-01",
          editorial: "Arqueiro",
          foto_portada: "",
        },
        {
          id: 3,
          nombre_libro: "Bajo la misma estrella",
          nombres_autor: "John Green",
          fecha_nacimiento: "1977-08-24",
          fecha_fallecimiento: "",
          genero_libro: "Ficcion realista",
          fecha_publicacion: "2003-04-01",
          editorial: "DEBOLSILLO",
          foto_portada: "",
        },
        {
          id: 4,
          nombre_libro: "Doña Bárbara",
          nombres_autor: "Rómulo Gallegos",
          fecha_nacimiento: "1884-08-02",
          fecha_fallecimiento: "1969-04-05",
          genero_libro: "Ficcion realista",
          fecha_publicacion: "1929-08-11",
          editorial: "Panapo",
          foto_portada: "",
        },
        
      ],
      form: {
        id: "",
        nombre_libro: "",
        nombres_autor: "",

        fecha_nacimiento: "",
        fecha_fallecimiento: "",
        genero_libro: "",
        fecha_publicacion: "",
        editorial: "",
        foto_portada: "",
      },
      modalInsertar: false,
      modalEditar: false,
      buscador: false,
      input_buscador: "",
    };
    
  }
  
  
  hableInputBuscador = (e) => {
    this.setState({
      input_buscador: document.getElementById("buscador_input").value,
    });
  };

  handleBuscadorChangeActivar = (e) => {
    this.setState({ buscador: true });

  };

  handleBuscadorChangeDesactivar = (e) => {
    this.setState({ buscador: false });
    
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    const blob = new Blob([file], { type: file.type }); // Crear un objeto Blob
    this.setState({
      selectedImage: file,
      form: {
        ...this.state.form,
        foto_portada: blob, // Asignar el objeto Blob a la propiedad foto_portada
      },
    });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };
  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (Registro) => {
    this.setState({ modalEditar: true, form: Registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar = () => {
    var valornuevo = { ...this.state.form };
    valornuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valornuevo);
    this.setState({ data: lista, modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((Registro) => {
      if (dato.id == Registro.id) {
        lista[contador].nombre_libro = dato.nombre_libro;
        lista[contador].nombres_autor = dato.nombres_autor;
        lista[contador].fecha_nacimiento = dato.fecha_nacimiento;
        lista[contador].fecha_fallecimiento = dato.fecha_fallecimiento;
        lista[contador].genero_libro = dato.genero_libro;
        lista[contador].fecha_publicacion = dato.fecha_publicacion;
        lista[contador].editorial = dato.editorial;
        lista[contador].foto_portada = dato.foto_portada;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Quiere eliminar el registro? ");
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((Registro) => {
        if (Registro.id == dato.id) {
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: lista });
    }
  };
  
  render() {
    

    return (
      <>
        <Hheader></Hheader>
        <Container >
          <br />
          <br />
          <div
            className="
            aja "
          >
            <Button
              color="warning"
              className="w-1/3 bg-amber-400"
              onClick={() => this.mostrarModalInsertar()}
            >
              Insertar nuevo libro
            </Button>
            <div className="gridd">
              <input
                className="form-control "
                type="text"
                name="buscador"
                id="buscador_input"
              />

              <Button
                color="primary"
                className=" bg-blue-500"
                onClick={() => {
                  this.handleBuscadorChangeActivar();
                  this.hableInputBuscador();
                }}
              >
                Buscar
              </Button>

              <Button
                className=" bg-slate-500"
                onClick={() => this.handleBuscadorChangeDesactivar()}
              >
                Cancelar
              </Button>
            </div>
          </div>
          <br />
          <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Nombre del libro: </th>
                <th className="w-1/6">Nombres completos de los autores</th>
                <th>Fecha de nacimiento del autor</th>
                <th className="hidden lg:table-cell">Fecha de fallecimiento</th>
                <th>Genero del libro</th>
                <th>Fecha de publicacion</th>
                <th>Editorial</th>
                <th className="hidden sm:table-cell">Foto portada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.buscador
                ? this.state.data.map((elemento) =>
                    elemento.nombre_libro === this.state.input_buscador ||
                    elemento.nombres_autor === this.state.input_buscador ? (
                      <tr>
                        <td>{elemento.nombre_libro}</td>
                        <td>{elemento.nombres_autor}</td>
                        <td>{elemento.fecha_nacimiento}</td>
                        <td className="hidden lg:table-cell">{elemento.fecha_fallecimiento}</td>
                        <td>{elemento.genero_libro}</td>
                        <td>{elemento.fecha_publicacion}</td>
                        <td>{elemento.editorial}</td>

                        <td className="hidden sm:table-cell">
                          {elemento.foto_portada !== undefined && (
                            <img
                              src={
                                elemento.foto_portada
                                  ? URL.createObjectURL(elemento.foto_portada)
                                  : null
                              }
                              alt=""
                            />
                          )}
                        </td>
                        <td>
                          <Button
                            color="primary"
                            className="bg-blue-500"
                            onClick={() => this.mostrarModalEditar(elemento)}
                          >
                            Editar
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="danger"
                            className="bg-red-500"
                            onClick={() => this.eliminar(elemento)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  )
                : this.state.data.map((elemento) => (
                    <tr>
                      <td>{elemento.nombre_libro}</td>
                      <td>{elemento.nombres_autor}</td>
                      <td>{elemento.fecha_nacimiento}</td>
                      <td className="hidden lg:table-cell">{elemento.fecha_fallecimiento}</td>
                      <td>{elemento.genero_libro}</td>
                      <td>{elemento.fecha_publicacion}</td>
                      <td>{elemento.editorial}</td>
                      <td className="hidden sm:table-cell">
                        {elemento.foto_portada !== undefined && (
                          <img
                            src={
                              elemento.foto_portada
                                ? URL.createObjectURL(elemento.foto_portada)
                                : null
                            }
                            alt=""
                          />
                        )}
                      </td>
                      <td>
                        <Button
                          color="primary"
                          className="bg-blue-500"
                          onClick={() => this.mostrarModalEditar(elemento)}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          className="bg-red-600"
                          onClick={() => this.eliminar(elemento)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
              {}
            </tbody>
          </Table>
          </div>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <form>
            <ModalHeader>
              <div>
                <h3>Insertar Registro</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>Id:</label>

                <input
                  className="form-control bg-slate-300"
                  readOnly
                  type="text"
                  value={this.state.form.id}
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
                <label>Nombres completos de los Autores</label>
                <input
                  
                  className="form-control"
                  name="nombres_autor"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.nombres_autor}
                />
                
              </FormGroup>

              <FormGroup>
                <label>Fecha de nacimiento del autor</label>
                <input
                  className="form-control"
                  name="fecha_nacimiento"
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.form.fecha_nacimiento}
                />
              </FormGroup>
              <FormGroup>
                <label>Fecha de fallecimiento del autor</label>
                <input
                  className="form-control"
                  name="fecha_fallecimiento"
                  type="date"
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
                  type="date"
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
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    this.handleImageChange(event);
                  }}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                className="bg-blue-500"
                onClick={() => this.insertar()}
              >
                Insertar
              </Button>

              <Button
                color="danger"
                className="bg-red-500"
                onClick={() => this.ocultarModalInsertar()}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </form>
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
                className="form-control bg-slate-300"
                readOnly
                type="text"
                value={this.state.form.id}
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
              <label>Nombres completos de los Autores</label>
              <input
                className="form-control"
                name="nombres_autor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombres_autor}
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha de nacimiento del autor</label>
              <input
                className="form-control"
                name="fecha_nacimiento"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha_nacimiento}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de fallecimiento del autor</label>
              <input
                className="form-control"
                name="fecha_fallecimiento"
                type="date"
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
                type="date"
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
                type="file"
                accept="image/*"
                onChange={(event) => {
                  this.handleChange(event);
                  this.handleImageChange(event);
                }}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              className="bg-blue-600"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              className="bg-red-600"
              onClick={() => this.ocultarModalEditar()}
            >
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
