import React, { useEffect, useState, useContext } from 'react';
import { Modal, Spin, Col, Row } from 'antd';

import PresentationsList from './PresentationsList/PresentationsList';
import { getSectionPresentations } from '../../../services/SectionService';
import PageUnreachable from '../../../common/PageUnreachable/PageUnreachable';

import './_section-modal.scss';
import AuthContext from '../../../auth_store/auth-context';

// const fetchedSectionMock = {
//     "id": 1,
//     "eventId": 1,
//     "locationId": 1,
//     "title": "Section A",
//     "chairs": [
//       "Chair AA",
//       "Chair AB"
//     ],
//     "startAt": "2021-11-07T14:07:53.750793+00:00",
//     "endAt": "2021-11-07T18:07:53.750793+00:00",
//     "backgroundColor": 2156287,
//     "presentations": [
//       {
//         "id": 1,
//         "title": "Presentation AA",
//         "authors": [
//           "Author AAA",
//           "Author AAB"
//         ],
//         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non ex volutpat arcu interdum condimentum elementum vel nisl. Integer iaculis turpis lectus, nec luctus ante mattis quis. Nunc at pharetra sem, id consectetur justo. Nulla consequat luctus fermentum. Morbi et ornare turpis, ac faucibus ante. Phasellus bibendum diam a accumsan feugiat. ",
//         "position": 1,
//         "durationMinutes": 60,
//         "attachment": null,
//         "mainAuthorPhoto": null
//       },
//       {
//         "id": 2,
//         "title": "Presentation AB",
//         "authors": [
//           "Author ABA",
//           "Author ABB"
//         ],
//         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non ex volutpat arcu interdum condimentum elementum vel nisl. Integer iaculis turpis lectus, nec luctus ante mattis quis. Nunc at pharetra sem, id consectetur justo. Nulla consequat luctus fermentum. Morbi et ornare turpis, ac faucibus ante. Phasellus bibendum diam a accumsan feugiat. ",
//         "position": 2,
//         "durationMinutes": 60,
//         "attachment": null,
//         "mainAuthorPhoto": null
//       },
//       {
//         "id": 3,
//         "title": "Presentation ABC",
//         "authors": [
//           "Author ABA",
//           "Author ABB"
//         ],
//         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non ex volutpat arcu interdum condimentum elementum vel nisl. Integer iaculis turpis lectus, nec luctus ante mattis quis. Nunc at pharetra sem, id consectetur justo. Nulla consequat luctus fermentum. Morbi et ornare turpis, ac faucibus ante. Phasellus bibendum diam a accumsan feugiat. ",
//         "position": 2,
//         "durationMinutes": 60,
//         "attachment": null,
//         "mainAuthorPhoto": null
//       },
//       {
//         "id": 4,
//         "title": "Presentation ABCD",
//         "authors": [
//           "Author ABA",
//           "Author ABB"
//         ],
//         "description": "Description",
//         "position": 2,
//         "durationMinutes": 90,
//         "attachment": null,
//         "mainAuthorPhoto": null
//       },
//       {
//         "id": 5,
//         "title": "Presentation ABCDF",
//         "authors": [
//           "Author ABA",
//           "Author ABB"
//         ],
//         "description": "Description",
//         "position": 2,
//         "durationMinutes": 90,
//         "attachment": null,
//         "mainAuthorPhoto": null
//       },
//     ]
//   };


const SectionModal = ({ visible, setVisibility, sectionInfo }) => {
	const { title, start, id, chairs } = sectionInfo;

	const [presentations, setPresentations] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isErrorPresent, setIsErrorPresent] = useState(false);
	const authCtx = useContext(AuthContext);


	const onClose = () => setVisibility(false);

	useEffect(() => {
		async function fetchData() {
			const presentations = await getSectionPresentations(id);
			setPresentations(presentations);
		}
		if (visible) {
			setIsLoading(true);
			fetchData()
				.then(() => {
					setIsLoading(false)
					setIsErrorPresent(false)
				})
				.catch((err) => {
					console.log(err, "\n", err.message)
					if (err.response.status === 401) {
						authCtx.logout()
					} else {
						setIsErrorPresent(true)
						setIsLoading(false)
					}
				}
			);
		}
	}, [visible, id]);

	return (
		<Modal
			visible={visible}
			title={title}
			onCancel={onClose}
			footer={null}
		>
			{isErrorPresent ?
				<PageUnreachable /> :
					isLoading ?
						<div className='section-modal--loading'>
							<Spin size='large'></Spin>
						</div> :
						<>
							<Row className="section-modal__chairs">
								<Col sm={6} >
									Led By:
								</Col>
								<Col sm={18}>
									{chairs?.join(' ,')}
								</Col>
							</Row>
							<PresentationsList
								presentations={presentations}
								sectionStart={start}
							/>
						</>
			}
		</Modal>
	);
}

export default SectionModal;
