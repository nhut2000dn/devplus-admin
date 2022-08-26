import React from 'react';
import { Table, Button, Form } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ChooseTablePhoto from '../utils/ChooseTablePhoto';
const TableSkill = ({ container, setFileArray, setImageArray, handleChange, handleDelete }) => {
	return (
		<>
			<Table hover className="user-table align-items-center">
				<thead className="thead-light">
					<tr>
						<th className="border-0 border-bottom">Avatar</th>
						<th className="border-0 border-bottom">Title</th>
						<th className="border-0 border-bottom">Desc</th>
						<th className="border-0 border-bottom">Action</th>
					</tr>
				</thead>
				<tbody>
					{container &&
						container.map((containers, index) => (
							<tr key={index}>
								<td className="border-0 text-danger" style={{ whiteSpace: 'normal' }}>
									<Form.Group id="img">
										<ChooseTablePhoto
											setFileArray={setFileArray}
											setImageArray={setImageArray}
											id={containers._id}
											photo={containers.image}
										/>
									</Form.Group>
								</td>
								<td className="border-0 fw-bold">
									<Form.Group id="title">
										<Form.Control
											required
											as="textarea"
											rows={3}
											type="text"
											name="title"
											value={containers.title}
											onChange={(event) => handleChange(event, containers._id)}
										/>
									</Form.Group>
								</td>
								<td className="border-0 text-danger">
									<Form.Group id="desc">
										<Form.Control
											required
											as="textarea"
											rows={3}
											type="text"
											name="desc"
											value={containers.desc}
											onChange={(event) => handleChange(event, containers._id)}
										/>
									</Form.Group>
								</td>
								<td>
									<Button
										variant="light"
										size="sm"
										className="text-danger"
										onClick={() => handleDelete(containers._id)}
									>
										<FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};

export default TableSkill;
