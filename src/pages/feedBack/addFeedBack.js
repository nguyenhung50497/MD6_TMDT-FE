import Navbar from "../../components/Navbar";
import {Link, Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import {Field, Form, Formik} from "formik";

export default function AddFeedBack() {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-12" style={{
                        backgroundColor: "rgb(237,237,237)",
                        height: "600px",
                        marginTop: "140px",
                    }}>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 bg-light" style={{width: '100%', height: '600px'}}>
                            <Formik initialValues={{evaluate: ''}} onSubmit={values => {
                                console.log(values.evaluate)
                            }}>  
                                <Form>
                                    <div className="wrapper5">
                                        <Field type="checkbox" name={'evaluate'} id="st1" value="5"/>
                                        <label htmlFor="st1"></label>
                                        <Field type="checkbox" name={'evaluate'} id="st2" value="4"/>
                                        <label htmlFor="st2"></label>
                                        <Field type="checkbox" name={'evaluate'} id="st3" value="3"/>
                                        <label htmlFor="st3"></label>
                                        <Field type="checkbox" name={'evaluate'} id="st4" value="2"/>
                                        <label htmlFor="st4"></label>
                                        <Field type="checkbox" name={'evaluate'} id="st5" value="1"/>
                                        <label htmlFor="st5"></label>
                                    </div>
                                    <div>
                                        <button type={"submit"}>add</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                <div className="col-12">
                    <Footer></Footer>
                </div>
            </div>
        </>
    )
}