import ButtonComponent from '../Button/Button'
import Img from '../Img/Img'
import React, { Fragment } from 'react'
import { Card, Row } from 'react-bootstrap'
import Image from '../../Utils/Image'
import SelectBox from '../Input/SelectBox'

const HomeCard = ({
    componentFrom,
    cardGlow,
    cardClassName,
    cardTitleClassName,
    cardTitle,
    cardBodyClassName,

    selecBoxChangeFun,
    serviceOptions,

    clickFunctionOne,
    btnOneTittle,
    btnOneName,
    btnOneDisable,
    btnOneClassname,

    clickFunctionTwo,
    btnTwoTittle,
    btnTwoName,
    btnTwoDisable,
    btnTwoClassname
}) => {
    return (
        <Card className={cardClassName} >
            <Card.Body className={`${cardBodyClassName} py-2`}>
                {
                    cardGlow ? <Fragment>
                        <Card.Title className="placeholder col-7 py-3 rounded-1"></Card.Title>
                        <div className="home-content-image-bg mb-4 w-100 placeholder col-12 py-3 rounded-1 placeholder-height-15-percent"></div>
                        <Card.Title className="placeholder col-12 py-3 rounded-1"></Card.Title>
                    </Fragment>

                        :

                        <Fragment>
                            <Card.Title className={`${cardTitleClassName} pt-0`}>
                                <div className='w-100 d-flex flex wrap align-items-center mn-3'>
                                    <div className="col-8">
                                        <h6 className='mb-0'>{cardTitle}</h6>
                                    </div>
                                    <div className="col-4">
                                        <div className='d-flex justify-content-end'>
                                            <div className="col p-1">
                                                <ButtonComponent
                                                    title={btnOneTittle}
                                                    buttonName={btnOneName}
                                                    className={`${btnOneClassname} w-100 ${!btnOneDisable ? 'text-dark' : 'text-primary'}`}
                                                    clickFunction={clickFunctionOne}
                                                    btnDisable={!btnOneDisable}
                                                />
                                            </div>

                                            <div className="col-5  p-1">
                                                <ButtonComponent
                                                    title={btnTwoTittle}
                                                    buttonName={btnTwoName}
                                                    className={`${btnTwoClassname} w-100 p-1 text-start ${btnTwoDisable ? 'text-dark' : 'text-primary'}`}
                                                    clickFunction={clickFunctionTwo}
                                                    btnDisable={btnTwoDisable}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Card.Title>

                            <div className="home-content-image-bg mb-4 w-100">
                                <Img src={Image.photoEmpty} />
                            </div>

                            <div className='d-flex mb-2'>
                                <div className="col p-1">
                                    <SelectBox
                                        defaultOption={serviceOptions?.length ? "Select service" : 'No services found'}
                                        selectOptions={serviceOptions}
                                        disableSelectBox={serviceOptions?.length}
                                        change={selecBoxChangeFun}
                                    />
                                </div>
                            </div>
                        </Fragment>
                }

            </Card.Body>
        </Card>
    )
}

export default HomeCard