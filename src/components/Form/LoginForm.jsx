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
import { loginRequest, loginResponse, updateFailure, updateToken } from '../../Redux/Slices/Common_Slice/Common_slice';

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
            dispatch(loginRequest())

            setTimeout(() => {
                let username = usernamee.trim()
                let password = sha256(passwordd.trim())

                console.log(username,password)
                if (username === "mr-unger" && password === "fe11543f71807a4b5d6302e118ac9c5ba7067cf15bd8da27bc2f2ce093318e14" || 
                    username === "mr-rowley" && password === "67b8d721e99b87f05d0e7653119ca3a1a0f657a708e05c6b0e6f33a937fd6a93" || 
                    username === "mr-toyota" && password === "d74c985dedcbf9df6834b77e4ad3cb320bb78c241585f725bdb337a9e69ec7d3" ||
                    username === "mr-jewelry" && password === "0291e9d80f089e4e9c2e6625355341267de6705d6bb1fd8e32195cc6ba617267" 
                
                ) {
                    dispatch(loginResponse(password))
                } else {
                    dispatch(updateFailure("Invalid credentials"))
                }

                // const basicAuth = "Basic " + btoa(`${username}:${password}`);
                // dispatch(handleLogin(basicAuth))
            }, 100)
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