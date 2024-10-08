import Support_Banner from '../../Components/Support_Banner/Support_Banner'
import './About.css'
const About = () => {
    return (
        <>
            <div className="container-fluid about_container">
                <div className="row about_row_1">
                    <div className="col-12 d-flex justify-content-center align-items-center about_col_1">
                        <h1>ABOUT US</h1>
                    </div>
                </div>
                <div className="row about_row_2 ">
                    <div className="col-12 d-flex justify-content-center align-items-center about_col_2">
                        <h1>Why Shop With Us ?</h1>
                    </div>
                </div>
            </div>
            <Support_Banner />
        </>
    )
}

export default About