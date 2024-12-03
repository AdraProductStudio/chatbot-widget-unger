import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import sha256 from 'sha256';
import { useSelector } from 'react-redux';

import InputGroup from '../Input/InputGroup';
import { useCustomNavigate, useDispatch } from '../CustomHooks';
import SpinnerComponent from '../Spinner/Spinner';
import { handleEyeFunction, handleLogin, handleLoginCredentials, handleResetAlMenus, handleValidation } from '../../Redux/Actions/Common_actions/Common_action';
import ButtonComponent from '../Button/Button';

const LoginForm = () => {
    const { usernamee, passwordd, eyeOpen, buttonSpinner, validated, token, user_id, role } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const handlSubmitOnEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (usernamee && passwordd) {
            let username = usernamee.trim()
            let password = sha256(passwordd.trim())
            const basicAuth = "Basic " + btoa(`${username}:${password}`);
            dispatch(handleLogin(basicAuth))
        } else {
            dispatch(handleValidation)
        }
    };

    useEffect(() => {
        dispatch(handleResetAlMenus)
        if (token) {
            // if(role === "admin"){
            //     navigate("/admin_dashboard/home")
            // }else{
                navigate("/home")
            // }
        }
    }, [token])


    return (
        <Form noValidate validated={validated} className='pb-3'>
            <Row className="mb-3">
                <InputGroup
                    controlId="validationLoginUsername"
                    gropuClassName="col-12 py-2 text-secondary mb-2"
                    inputHeading="Username"
                    inputType="text"
                    placeholder="Username"
                    inputError="Username required"
                    change={(e) => dispatch(handleLoginCredentials({ username: e.target.value }))}
                    value={usernamee}
                />

                <InputGroup
                    controlId="validationLoginPassword"
                    gropuClassName="col-12 py-2 text-secondary"
                    inputHeading="Password"
                    inputType="password"
                    placeholder="Password"
                    inputError="Password required"
                    value={passwordd}
                    eyeState={!eyeOpen}
                    change={(e) => dispatch(handleLoginCredentials({ password: e.target.value }))}
                    eyeFunctionClick={() => dispatch(handleEyeFunction())}
                    keyDown={handlSubmitOnEnter}
                />
            </Row>

            <ButtonComponent
                type="button"
                className="btn-md w-100"
                clickFunction={handleSubmit}
                title="Login"
                buttonName={buttonSpinner ?
                    <SpinnerComponent />
                    :
                    "Login"
                }
                btnDisable={buttonSpinner}
            />
        </Form>
    )
}

export default LoginForm