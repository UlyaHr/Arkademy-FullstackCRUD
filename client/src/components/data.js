import React from "react";
import { Table, Button, Modal, TextInput, } from "react-materialize";
import axios from "axios";
import sweet from "sweetalert";
import logoHapus from "../assets/trashIcon.png";
import logoEdit from "../assets/editIcon.png";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      link: "http://localhost:3030/api/",
      keterangan: [],
      harga: [],
      jumlah: [],
      isEdit: false,
      selectedProduct: {},
    };
  }

  componentDidMount() {
    axios
      .get(this.state.link + "produk")
      .then(({ data }) => this.setState(data));
    axios
      .get(this.state.link + "salary")
      .then(({ data }) => this.setState({ salary: data.data }));
    axios
      .get(this.state.link + "work")
      .then(({ data }) => this.setState({ work: data.data }));
  }

  delete(id) {
    axios.delete(this.state.link + `produk/${id}`).then(() => {
      sweet({
        title: "Yakin ingin dihapus?",
        text: "Apakah anda yakin mau menghapus data?",
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((Delete) => {
        if (Delete) {
          sweet("Data Dihapus!", "", "success");
          this.setState({
            data: this.state.data.filter((item) => item.id !== id),
          });
        }
      });
    });
  }

  render() {
    const user = this.state.data;
    return (
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="btn-div">
          <button
            class="btn waves-effect waves-light modal-trigger blue darken-4"
            href="#modal"
            onClick={() => this.setState({ isEdit: false, selectedProduct: {} })}
            >
            <i class="material-icons right">add</i>
            Add
          </button>
        </div>
        <Table className="striped responsive-table centered">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Keterangan</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.nama_produk}</td>
                  <td>{item.keterangan}</td>
                  <td>{item.harga}</td>
                  <td>{item.jumlah}</td>
                  <td>
                    <Button
                      href="#modal"
                      onClick={() =>
                        this.setState({
                          isEdit: true,
                          selectedProduct: item,
                        })
                      }
                      className="waves-effect waves-light btn-flat modal-trigger"
                    >
                      <img
                        style={{
                          width: 20,
                          height: 20
                        }}
                        src={logoEdit}
                        alt="Edit"
                      />
                    </Button>
                    <Button
                      className="waves-effect waves-light btn-flat"
                      onClick={() => this.delete(item.id)}
                    >
                      <img
                        style={{
                          width: 20,
                          height: 20
                        }}
                        src={logoHapus}
                        alt="delete"
                      />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <OpenModal
          edit={this.state.isEdit}
          keterangan={this.state.keterangan}
          harga={this.state.harga}
          jumlah={this.state.jumlah}
          produk={this.state.isEdit ? this.state.selectedProduct : {}}
        />
      </div>
    );
  }
}

class OpenModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keteranganState: props.produk.keterangan || "",
      hargaState: props.produk.harga || "",
      jumlahState: props.produk.jumlah || "",
      namaState: props.produk.nama_produk || "",
    };
  }
  addData() {
    axios
      .post("http://localhost:3030/api/produk", {
        nama_produk: this.state.namaState,
        keterangan: this.state.keteranganState,
        harga: this.state.hargaState,
        jumlah: this.state.jumlahState,
      })
      .then(({ data }) => {
        sweet(data.message, "", "success").then(() => {
          window.location.href = "";
        });
      });
  }
  editData() {
    axios
      .put("http://localhost:3030/api/produk/" + this.props.produk.id, {
        nama_produk: this.state.namaState,
        keterangan: this.state.keteranganState,
        harga: this.state.hargaState,
        jumlah: this.state.jumlahState,
      })
      .then(({ data }) => {
        sweet(data.message, "", "success").then(() => {
          window.location.href = "";
        });
      });
  }
  render() {
    return (
      <div>
        <Modal
          id="modal"
          header={this.props.edit ? "EDIT DATA" : "ADD DATA"}
          actions={[
            <Button
              onClick={() =>
                this.props.edit ? this.editData() : this.addData()
              }
              style={{
                float: "right",
                backgroundColor: "#00bcd4",
                borderRadius: "10px",
                width: "100px",
              }}
            >
              {this.props.edit ? "EDIT" : "ADD"}
            </Button>,
            <Button waves="green" modal="close" flat>
              Cancel
            </Button>,
          ]}
        >
          <TextInput
            label="Nama produk"
            value={this.state.nama_produk}
            onChange={(e) => this.setState({ namaState: e.target.value })}
          />
          <TextInput
            label="Keterangan"
            value={this.state.keterangan}
            onChange={(e) => this.setState({ keteranganState: e.target.value })}
          />
          <TextInput
            label="Harga"
            value={this.state.harga}
            onChange={(e) => this.setState({ hargaState: e.target.value })}
          />
          <TextInput
            label="jumlah"
            value={this.state.jumlah}
            onChange={(e) => this.setState({ jumlahState: e.target.value })}
          />
        </Modal>
      </div>
    );
  }
}

export default DataTable;
