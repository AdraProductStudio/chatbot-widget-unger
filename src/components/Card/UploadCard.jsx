import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { handleGetDocuments, handleModalType } from "../../Redux/Actions/Onboarding_actions/uploadCatalogAction";
import { handleUpdateModalShow } from "../../Redux/Actions/Common_actions/Common_action";
import { Fragment } from "react";
import ButtonComponent from "../Button/Button";
import Icons from "../../Utils/Icons";

export const UploadCard = ({ title, description, fileCategory, user_id, service_id, isPreview }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Card className="mt-3 catalog-inner-card">
        <Card.Body>
          <div className="row">
            <div className={`col-lg-3 ${isPreview === "UploadCatalog" && 'pe-none'}`}>
              <div className="text-center d-flex flex-column p-4 cursor-pointer upload-file-container" onClick={() => {
                dispatch(handleModalType({ type: 'upload csv', file_category: fileCategory }))
                dispatch(handleUpdateModalShow)
              }}>
                <div className="w-100 text-center">
                  {Icons.uploadIconBlue}
                </div>

                <p className="pt-4"> Drag & Drop Your File or{" "}
                  <b className="text-primary browse-text">Browse</b>
                </p>
                {
                  title === "Upload Marketing Material" ?
                    <p className=" mb-0 text-danger">
                      <span className="me-1 fs-5 ">*</span>
                      Limit ~ 250 pages
                    </p>
                    :
                    null
                }
              </div>
            </div>

            <div className="col-lg-9 my-auto catalog-upload-card  mt-sm-3 mt-lg-0">
              <div className="ms-sm-0 ms-lg-3 ">
                <Card.Title className="catalog-inner-card-title">{title}</Card.Title>
                <p className="catalog-inner-card-description">{description}</p>
                <ButtonComponent
                  type="button"
                  className="btn-sm"
                  buttonName="Check Previous Documents"
                  clickFunction={() => {
                    dispatch(handleModalType({ type: 'show table', file_category: fileCategory }))
                    dispatch(handleUpdateModalShow)
                    dispatch(handleGetDocuments(fileCategory, user_id, service_id))
                  }}
                />

              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};