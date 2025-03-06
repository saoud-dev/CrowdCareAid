import "./FundraiserDetails.css";
import { useGetCategoriesQuery } from "../Redux/apiSlice";

const FundraiserDetails = ({ setActiveComponent, formData, setFormData }) => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

          <div className="fund-form-group">
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="fund-form-group">
            <label>Select Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              {data?.data?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="fund-form-group">
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="fund-button"
            onClick={() => setActiveComponent("AmountDetails", formData)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundraiserDetails;
