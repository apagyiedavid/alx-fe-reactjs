import { useParams } from 'react-router-dom';

function Profile() {
  // If you want to use URL parameters
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <p>Welcome to your profile!</p>
      {username && <p>Username: {username}</p>}
    </div>
  );
}

export default Profile;