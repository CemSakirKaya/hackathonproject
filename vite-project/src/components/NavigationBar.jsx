import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/create');
    };
    const handleLaunchpadClick = () => {
        navigate('/');
    };


    return (

        


        <>

           <h1 className="ml-3" onClick={handleLaunchpadClick}>EduPad</h1>

            <div className='buttons'>
            <button className="btn btn-warning mr-2" onClick={handleLaunchpadClick}>
                Launchpad List
            </button>
            
            <button className="btn btn-primary mr-5" onClick={handleCreateClick}>
                Create Token
            </button>
            </div>
          
      
        </>
    );
}
