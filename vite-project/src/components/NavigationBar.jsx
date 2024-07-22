import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/create');
    };


    return (
        <>
            <h1 className="ml-3">EduPad</h1>
            <button className="btn btn-primary mr-3" onClick={handleCreateClick}>
                Create
            </button>
      
        </>
    );
}
