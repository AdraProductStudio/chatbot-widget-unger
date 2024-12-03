import { Card } from "react-bootstrap";
import { UploadCard } from "./UploadCard";

export const CatalogSection = ({ header, uploadSections, user_id, service_id,isPreview }) => (
    <Card className={`catalog-outer-card-container ${header === "For the chatbot to answer consumer questions" ? 'mt-4' : ''}`}>
        <Card.Header as="h6" className="bg-white border-0 catalog-outer-card-header">
            <Card.Title className="catalog-outer-card-title mb-0">{header}</Card.Title>
        </Card.Header>
        <Card.Body className="catalog-inner-card-container ">
            {uploadSections.map((section, index) => (
                <UploadCard
                    key={index}
                    title={section.title}
                    description={section.description}
                    fileCategory={section.file_category}
                    user_id={user_id}
                    service_id={service_id}
                    isPreview={isPreview}

                />
            ))}
        </Card.Body>
    </Card>
);