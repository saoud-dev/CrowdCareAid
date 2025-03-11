import "./FundraiserDetails.css";
import { useGetCategoriesQuery } from "../Redux/apiSlice";
import { useForm } from "react-hook-form";

const FundraiserDetails = ({ setActiveComponent, formData, setFormData }) => {
  const { data } = useGetCategoriesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  // Form submit handler
  const onSubmit = (data) => {
    setFormData(data);
    setActiveComponent("AmountDetails");
  };

  return (
    <div className="fund-container">
      <div className="fund-heading">
        <h2>Fundraiser Details</h2>
      </div>

      <div className="fund-flex">
        <div className="fund-sidebar">
          <div className="fund-step">
            <div className="fund-step-circle active">1</div>
            <span>Fundraiser Details</span>
          </div>
          <div className="fund-line"></div>
          <div className="fund-step">
            <div className="fund-step-circle inactive">2</div>
            <span>Amount Details</span>
          </div>
          <div className="fund-line"></div>
          <div className="fund-step">
            <div className="fund-step-circle inactive">3</div>
            <span>Review</span>
          </div>
        </div>

        <div className="fund-form-container">
          <div className="fund-banner">
            <div className="fund-banner-overlay">
              <h2>
                <span className="fund-highlight">Empower Change</span> <br />
                <span className="fund-down">Contribute to Our Cause Today</span>
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="fund-form-group">
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter Title"
              />
              {errors.title && (
                <p className="error-text">{errors.title.message}</p>
              )}
            </div>

            <div className="fund-form-group">
              <label>Select Category</label>
              <select
                {...register("category", {
                  required: "Please select a category",
                })}
              >
                <option value="">Select a Category</option>
                {data?.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="error-text">{errors.category.message}</p>
              )}
            </div>

            <div className="fund-form-group">
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter Location"
              />
              {errors.location && (
                <p className="error-text">{errors.location.message}</p>
              )}
            </div>

            <div className="fund-btn-flex">
              <button className="fund-button" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundraiserDetails;
