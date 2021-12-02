import { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { IoMdAddCircle } from 'react-icons/io';
import { useHistory } from 'react-router';
import user from '../images/User.jpg';

const UserAdminForm = () => {
	const [name, setName] = useState('');
	const [job, setJob] = useState('');
	const [bio, setBio] = useState('');
	const [userImage, setUserImage] = useState('');

	const [valid, setValid] = useState(true);
	const { setUser } = useContext(AppContext);
	const history = useHistory();

	const uploadImage = async () => {
		try {
			const formData = new FormData();
			formData.append('file', userImage);
			formData.append('upload_preset', 'cig52kqk');
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/socialcard/upload`,
				{
					method: 'POST',
					body: formData,
				},
			);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center w-full">
			<div className="flex-1 flex flex-col items-center max-w-xl">
				<div className="text-center text-4xl mb-8 mt-4">Edit Profile.</div>
				<div className="border box-content flex flex-col overflow-hidden rounded-3xl w-full">
					<div className="flex">
						<div className="w-1/3 flex flex-col items-center justify-center">
							<img src={user} alt="" className="mt-14" />
							<button className="bg-black cursor-pointer mb-8 mt-auto px-5 py-2 relative rounded text-white">
								<span className="cursor-pointer">Upload Image</span>
								<input
									className="absolute cursor-pointer h-full left-0 opacity-0 top-0 w-full"
									type="file"
									onChange={(event) => {
										setUserImage(event.target.files[0]);
									}}
								/>
							</button>
							{/* <button className="bg-black mb-8 mt-auto px-5 py-2 rounded text-white">
								Upload
							</button> */}
						</div>
						<form
							className="flex flex-col p-4 pt-10 w-2/3"
							onSubmit={async (e) => {
								e.preventDefault();
							}}>
							<input
								id="name"
								autoFocus={true}
								autoComplete="on"
								className="border border-solid mb-2 px-1 py-1.5 rounded outline-none"
								placeholder="Full Name"
								type="text"
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								id="job"
								className="border border-solid mb-2 px-1 py-1.5 rounded outline-none"
								placeholder="Job Type"
								type="text"
								onChange={(e) => setJob(e.target.value)}
							/>
							<textarea
								id="bio"
								className="border border-solid mb-2 px-1 py-1.5 rounded outline-none"
								placeholder="Bio"
								type="text"
								onChange={(e) => setBio(e.target.value)}
							/>
							<a className="flex mb-4 items-center" href="">
								<IoMdAddCircle className="w-10 h-10 mr-4" />
								<div className="text-gray-400">Add social link</div>
							</a>
						</form>
					</div>
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-600 p-3 rounded text-white"
						onClick={uploadImage}>
						Save Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserAdminForm;
