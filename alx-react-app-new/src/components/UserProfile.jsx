const UserProfile = (props) => {
  return (
<div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
   <h2 style={{ color: 'blue' }}>{props.name}Alice</h2>
   <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>25</p>
   <p>Bio: {props.bio}Loves hiking and photography</p>
 </div>
  );
};

export default UserProfile;