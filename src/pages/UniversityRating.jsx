import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

function UniversityRating(){
    const {data: ratingView} = useDrupalData(`/jsonapi/views/university_rating/page_1`);
    return (
        <div className={"rating container"}>
            <div className="rating-view">
                {ratingView?.data?.map((item, index) => (
                    <div key={index}>
                        <a href={item?.attributes?.field_link?.full_url} className={"rating-item flex flex-col items-center"}>
                            <ImageComponent
                                url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                imagestyle={"thumbnail"}
                                alt={item?.relationships?.field_image?.data?.meta?.alt}
                            />
                            <h1 className={"rating-item__title"}>
                                {item?.attributes?.title}
                            </h1>
                            <p className={"rating-item__top-description text-center"}>
                                {item?.attributes?.field_top_description}
                            </p>
                            <p className={"rating-item__bottom-description text-center"}>
                                {item?.attributes?.field_bottom_description}
                            </p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UniversityRating;