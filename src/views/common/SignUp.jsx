import React, { useEffect, useState } from 'react'

import { Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import sha256 from 'sha256';
import { handleEyeFunction, handleEyeFunctionConfirmPassword, handleRegister, handleRegistercredentials, handleResetAlMenus } from '../../Redux/Actions/Common_actions/Common_action'
import ButtonComponent from '../../components/Button/Button'
import SpinnerComponent from '../../components/Spinner/Spinner'
import InputGroup from '../../components/Input/InputGroup';
import { useDispatch } from '../../components/CustomHooks';
import Img from '../../components/Img/Img'
import Image from '../../Utils/Image'

import LinkComponent from '../../components/Router_components/LinkComponent'



const SignupForm = () => {
    const { email, usernamee, regPassword, confirmPassword, eyeOpen, eyeOpenTwo, buttonSpinner } = useSelector((state) => state.commonState)
    const dispatch = useDispatch();


    const [errMessage, setErrMessege] = useState({
        emailErr: "",
        usernameErr: "",
        passwordErr: "",
        confirmPasswordErr: "",
    });

    const [showError, setShowError] = useState({
        emailErr: false,
        usernameErr: false,
        passwordErr: false,
        confirmPasswordErr: false,
    });

    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    const handleRegisterSubmit = () => {
        if (usernamee && regPassword && regPassword && confirmPassword && (regPassword === confirmPassword)) {
            dispatch(handleRegister({ username: usernamee, password: sha256(regPassword), email_id: email }));

        }

    };


    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const minLengthCheck = password.length >= 6;
        const uppercaseCheck = /[A-Z]/.test(password);
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return minLengthCheck && uppercaseCheck && specialCharCheck;
    };

    const validateConfirmPassword = (confirmPassword, regPassword) => {
        return confirmPassword === regPassword;
    };

    const handleBlur = (value) => {
        if (value === "email") {
            if (!email) {
                setShowError({
                    ...showError,
                    emailErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    emailErr: "Email is required",
                });
            } else if (!validateEmail(email)) {
                setShowError({
                    ...showError,
                    emailErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    emailErr: "Please Enter valid Email",
                });
            } else {
                setShowError({
                    ...showError,
                    emailErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    emailErr: "",
                });
            }
        } else if (value === "regPassword") {
            if (!regPassword) {
                setShowError({
                    ...showError,
                    passwordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    passwordErr: "Password is required",
                });
            } else if (!validatePassword(regPassword)) {
                setShowError({
                    ...showError,
                    passwordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    passwordErr:
                        "Password must be at least 6 characters & contain at least one uppercase & one special character",
                });
            } else {
                setShowError({
                    ...showError,
                    passwordErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    passwordErr: "",
                });
            }
        } else if (value === "confirmPassword") {
            if (!confirmPassword) {
                setShowError({
                    ...showError,
                    confirmPasswordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    confirmPasswordErr: "Password is required",
                });
            } else if (!validateConfirmPassword(confirmPassword, regPassword)) {
                setShowError({
                    ...showError,
                    confirmPasswordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    confirmPasswordErr: "Passwords do not match",
                });
            } else {
                setShowError({
                    ...showError,
                    confirmPasswordErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    confirmPasswordErr: "",
                });
            }
        } else {
            if (!usernamee) {
                setShowError({
                    ...showError,
                    usernameErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    usernameErr: "username is required",
                });
            } else {
                setShowError({
                    ...showError,
                    usernameErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    usernameErr: "",
                });
            }
        }
    };

    return (


        <div className="bg-light">
      <div className="container-fluid">
        <div className="row justify-content-center vh-100 align-items-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 login-large-screen-width">
            <div className="card border border-light-subtle rounded-4 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5 py-5">
                <div className="text-center mb-3">
                  <Img
                    src={Image.companyLogoBlue}
                    alt="modelrocket-logo"
                  />
                  <p className='text-secondary fw-bold mt-3'>Customer Onboarding</p>
                  <h6 className='text-center text-primary fw-bold'>Sign Up</h6>
                  <hr className='text-secondary mt-2 mb-4' />
                </div>
                <Form>
            <Row className="mb-3">
                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Username"
                    inputType="text"
                    placeholder="Username"
                    change={(e) =>
                        dispatch(handleRegistercredentials({ usernamee: e.target.value }))
                    }
                    value={usernamee}
                    handleBlur={() => handleBlur("username")}
                />
                {showError.usernameErr ? (
                    <span className="text-danger">{errMessage.usernameErr}</span>
                ) : null}

                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Email ID"
                    inputType="email"
                    placeholder="Email ID"
                    change={(e) =>
                        dispatch(handleRegistercredentials({ email: e.target.value }))
                    }
                    value={email}
                    handleBlur={() => handleBlur("email")}
                />
                {showError.emailErr ? (
                    <span className="text-danger">{errMessage.emailErr}</span>
                ) : null}

                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Password"
                    inputType="password"
                    placeholder="Password"
                    change={(e) =>
                        dispatch(handleRegistercredentials({ regPassword: e.target.value }))
                    }
                    value={regPassword}
                    eyeState={!eyeOpen}
                    eyeFunctionClick={() => dispatch(handleEyeFunction())}
                    handleBlur={() => handleBlur("regPassword")}
                />

                {showError.passwordErr ? (
                    <span className="text-danger">{errMessage.passwordErr}</span>
                ) : null}

                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Confirm Password"
                    inputType="password"
                    placeholder="Confirm Password"
                    change={(e) =>
                        dispatch(
                            handleRegistercredentials({ confirmPassword: e.target.value })
                        )
                    }
                    value={confirmPassword}
                    eyeState={!eyeOpenTwo}
                    eyeFunctionClick={() => dispatch(handleEyeFunctionConfirmPassword)}
                    handleBlur={() => handleBlur("confirmPassword")}
                />

                {showError.confirmPasswordErr ? (
                    <span className="text-danger">{errMessage.confirmPasswordErr}</span>
                ) : null}
            </Row>

            <ButtonComponent
                type="button"
                className="btn-md w-100 mb-3"
                title="Sign Up"
                buttonName={buttonSpinner ?
                    <SpinnerComponent />
                    :
                    "Sign Up"
                }
                btnDisable={buttonSpinner}
                clickFunction={handleRegisterSubmit}
            />
        </Form>

                <div className='or-border mt-4'>
                  <hr className='text-secondary' />
                  <div className="or-border-absolute">
                    Or
                  </div>
                </div>

                <div className='text-center pt-2'>
                  Already have an account?
                  <LinkComponent
                    to="/"
                    title="Login"
                    className="ms-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



        
    )
}

export default SignupForm