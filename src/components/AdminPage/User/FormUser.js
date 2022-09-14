import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { client, getUsers } from "../../../service/baseApi";
import TableUser from "./TableUser";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormConcern = () => {
  const [concerns, setConcerns] = useState([{}]);

  const cookies = new Cookies();

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUsers();
      const concern = data;
      if (concern[0]) {
        setConcerns(concern)
      }
    };
    fetchData();
  });

  const handleClickDelete = async (id) => {
    try {
      const idToast = toast("Deleting in progress, please wait", {autoClose: false })
      await client.delete(`/user/${id}`);
      if (cookies.get('id') == id) {
        cookies.remove("TOKEN", { path: "/" });
        cookies.remove("email", { path: "/" });
        cookies.remove("avatar", { path: "/" });
        cookies.remove("id", { path: "/" });
        history.push("/sign-in");
      }
      const { data } = await getUsers();
      const concern = data;
      if (concern[0]) {
        setConcerns(concern)
      } else {
        setConcerns([{}])
      }
      toast.update(idToast, { 
        type: "success",
        render: "Delete success",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleClickEdit = async (id) => {
    history.push(`/users/${id}`);
  };

  return (
    <>
      {
        Object.keys(concerns[0]).length > 0 ?
        <>
          <Card
            border="light"
            className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm"
          >
            <Card.Body>
              <TableUser
                concerns={concerns}
                handleDelete={handleClickDelete}
                handleClickEdit = {handleClickEdit}
              />
            </Card.Body>
          </Card>
          <ToastContainer position="top-center" />
        </> : <></>
      }
    </>
  );
};

export default FormConcern;
