import Support_Banner from '../../../Components/User/Support_Banner/Support_Banner';
import './About.css';

const About = () => {
    return (
        <>
            <div className="container-fluid about_container">
                <div className="row about_row_1">
                    <div className="col-12 d-flex justify-content-center flex-column align-items-center">
                        <p>Home &gt; About us</p>
                        <h1 className='fw-bold'>ABOUT US</h1>
                    </div>
                </div>
                <div className="row about_row_2 ">
                    <div className="col-12 d-flex justify-content-center align-items-center about_col_2">
                        <h1 className='fw-bold fs-1'>Why Shop With Us ?</h1>
                    </div>
                </div>
            </div>
            <Support_Banner />
        </>
    )
}

export default About