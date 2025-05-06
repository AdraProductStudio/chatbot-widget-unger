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

                // console.log(username,password)
                if (username === "mr-unger" && password === "fe11543f71807a4b5d6302e118ac9c5ba7067cf15bd8da27bc2f2ce093318e14" ||
                    username === "mr-rowley" && password === "67b8d721e99b87f05d0e7653119ca3a1a0f657a708e05c6b0e6f33a937fd6a93" ||
                    username === "mr-toyota" && password === "d74c985dedcbf9df6834b77e4ad3cb320bb78c241585f725bdb337a9e69ec7d3" ||
                    username === "mr-jewelry" && password === "0291e9d80f089e4e9c2e6625355341267de6705d6bb1fd8e32195cc6ba617267" ||
                    username === "mr-easton" && password === "21e57bcb84db66db631014e70adfe6c432022a9e4f4e5991c1b467a9133d4886" ||  // eastonroofing
                    username === "mr-v1" && password === "c81ef2ab35675840b62641dfcdd856bcabf635cdc7758c73616091b764397bbe" ||
                    username === "mr-v2" && password === "de5661de447c95026d3733498c25a232591195485c2d5a2df78efe9e86292351" ||
                    username === "mr-ron" && password === "e0d5f95de4567129a7bf7436d6011efc9714e6cd8610595ff5e0f40f59195a36" ||
                    username === "mr-east" && password === "b0bf241a612d80d014603d8dec42b5836ce5ba3c4c246d498ba16830c814e4da" ||
                    username === "mr-march" && password === "e5ff0c2d1e17b16a8bd0da20d8e0ee594392cd22eb6ab5ee4ccfdd895d4aa6e6" ||
                    username === "mr-jcheritage" && password === "afcc015cd8d5d672cf12231d0ece8253480c0002053a5223e1618e79579684f2" ||
                    username === "mr-southern" && password === "e2f745e47090de53dbb07967bcb9365e6fffb696b45ec22bc7321ce1832765e5" ||
                    username === "mr-turf" && password === "76ca3e7b224d4d957520a6f4a16630de6446ad8dafe3b085b3fb64322df86223" ||
                    username === "mr-assurance" && password === "2fb1949b85342ad3a4c4e554a5cb8a47839b9afee909d9022b019189577cb6ca" ||
                    username === "mr-easton" && password === "0d21209ecbb0aebd983fa87c43e34afe1a967b61e063c7f586ff9a98d2d733fa"  // eastonroofing-new

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