import React, { useState, useEffect } from 'react';
import { client, getSkill } from '../../../service/baseApi';
import TableSkill from './TableSkill';
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { uploadSingleImage } from '../../../service/uploadImage';
import ChoosePhoto from '../utils/ChoosePhoto';
import ModalDelete from '../utils/ModalDelete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormSkill = ({ setDisableAdd }) => {
	const [container, setContainer] = useState([]);
	const [desc, setDesc] = useState('');
	const [title, setTitle] = useState('');
	const [image, setImage] = useState(
		'https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e'
	);
	const [id, setId] = useState('');
	const [fileArray, setFileArray] = useState([]);
	const [imageArray, setImageArray] = useState([]);
	const [imageUpLoadArray, setImageUploadArray] = useState([]);
	const [showDefault, setShowDefault] = useState(false);
	const [disableUpdate, setDisableUpdate] = useState(false);
	const [imageFile, setImageFile] = useState(null);

	// handle ...........................................

	const handleClose = () => setShowDefault(false);

	const handleChangeItemTable = (event, id) => {
		const { value, name } = event.target;
		setContainer((prevState) =>
			prevState.map((containers) => {
				if (containers._id === id) {
					return { ...containers, [name]: value };
				}
				return containers;
			})
		);
	};

	const handleDeleteItemTable = (id) => {
		setContainer((prevState) => prevState.filter((containers) => containers._id !== id));
	};

	const handleClickAdd = () => {
		if (desc && title) {
			setContainer((prevState) => [...prevState, { desc, title, image: image }]);
			setDesc('');
			setTitle('');
			setImage(
				'https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e'
			);
			setImageUploadArray((prevState) => [...prevState, { index: container.length - 1, file: imageFile }]);
		}
	};

	useEffect(() => {
		setContainer((prevState) =>
			prevState.map((obj) => {
				const index = imageArray.findIndex((imgObj) => imgObj._id === obj._id);
				if (index > -1) {
					return { ...obj, image: imageArray[index].image };
				}
				return obj;
			})
		);
	}, [imageArray]);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getSkill();
			const containerData = data[0];
			if (containerData) {
				setContainer(containerData.container);
				setId(containerData._id);
				setDisableAdd(true);
			} else {
				setDisableUpdate(true);
			}
		};

		fetchData();
	}, [setDisableAdd]);

	const handleClickSave = async (e) => {
		e.preventDefault();

    try {
      const idToast = toast("Updating in progress, please wait", {autoClose: false })
			let updatedContainer = {
				container,
			};
	
			const putData = async (id, objData) => {
				const res = await client.put(`/skill/${id}`, objData);
				setContainer(res.data.container);
			};
	
			const changeData = async (fileArray) => {
				const promises = fileArray.map((arr) => {
					return new Promise((resolve, reject) => {
						uploadSingleImage(arr.file).then((image) => resolve({ ...arr, image: image }));
					});
				});
	
				return Promise.all(promises).then((result) => result);
			};
	
			if (imageUpLoadArray) {
				const newUpload = await changeData(imageUpLoadArray);
				newUpload.forEach((updatedObj) => {
					updatedContainer.container[updatedObj.index].image = updatedObj.image;
				});
			}
	
			if (fileArray) {
				const newUpload = await changeData(fileArray);
				newUpload.forEach((updatedObj) => {
					const index = updatedContainer.container.findIndex((obj) => obj._id === updatedObj._id);
					if (index > -1) {
						updatedContainer.container[index].image = updatedObj.image;
					}
				});
			}
			putData(id, updatedContainer);

      toast.update(idToast, { 
        type: "success",
        render: "Update success",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error)
    }
	};

	const handleClickDelete = async () => {
    try {
      const idToast = toast("Deleting in progress, please wait", {autoClose: false })
			await client.delete(`/skill/${id}`);
			setContainer([]);
			setImage(
				'https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e'
			);
			setShowDefault(false);
			setDisableUpdate(true);
			setDisableAdd(false);
      toast.update(idToast, { 
        type: "success",
        render: "Delete success",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error)
    }
	};

	return (
		<>
			<Card border="light" className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm">
				<Card.Body>
					<h5 className="mb-4">Skill</h5>
					<TableSkill
						container={container}
						setFileArray={setFileArray}
						setImageArray={setImageArray}
						handleChange={handleChangeItemTable}
						handleDelete={handleDeleteItemTable}
					/>
				</Card.Body>
			</Card>
			<Card border="light" className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm">
				<Card.Body>
					<h5 className="mb-4">Add Skill</h5>
					<Form>
						<Row>
							<Col md={12} className="mb-3">
								<Form.Group id="logo">
									<Form.Label>Image</Form.Label>
									<ChoosePhoto setFile={setImageFile} setImg={setImage} photo={image} />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={12} className="mb-3">
								<Form.Group id="title">
									<Form.Label>Title</Form.Label>
									<Form.Control
										required
										type="text"
										name="title"
										onChange={(e) => setTitle(e.target.value)}
										value={title}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={12} className="mb-3">
								<Form.Group id="desc">
									<Form.Label>Description</Form.Label>
									<Form.Control
										required
										type="text"
										name="desc"
										onChange={(e) => setDesc(e.target.value)}
										value={desc}
									/>
								</Form.Group>
							</Col>
						</Row>

						<div className="mt-3 d-flex justify-content-between">
							<Button onClick={handleClickAdd} variant="primary">
								Add
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
			<Card border="light" className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm">
				<Card.Body>
					<Form>
						<div className="mt-3 d-flex justify-content-between">
							<Button onClick={handleClickSave} variant="primary" type="submit" disabled={disableUpdate}>
								Save All
							</Button>
							<Button variant="danger" onClick={() => setShowDefault(true)}>
								Delete
							</Button>
							<ModalDelete
								showDefault={showDefault}
								handleDelete={handleClickDelete}
								handleClose={handleClose}
								name="skill"
							/>
						</div>
					</Form>
				</Card.Body>
				<ToastContainer position="top-center" />
			</Card>
		</>
	);
};

export default FormSkill;
