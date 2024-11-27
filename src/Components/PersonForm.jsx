// eslint-disable-next-line react/prop-types
export default function PersonForm({ title, formData, onChange }) {
  const handelSelectChange = (name, value) => {
    onChange({ ...formData, [name]: value });
  };
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };
  const handelInputFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const formDataImage = new FormData();
    formDataImage.append("file", selectedFile);

    console.log("form Data Image", formDataImage);

    if (!selectedFile) {
      console.error("No file selected!");
      return;
    }
    // create url
    const previewUrl = URL.createObjectURL(selectedFile);
    console.log("Preview URL", previewUrl);

    // convert b64
    const reader = new FileReader();
    reader.onload = () => {
        //   console.log("Base64 String", reader.result);
        onChange({ ...formData, image: reader.result });
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <fieldset style={{ marginTop: "3%" }}>
        <legend>{title}</legend>
        <label htmlFor={`title-${title}`}>Title:</label>
        <br />
        <select
          onChange={(e) => handelSelectChange("title", e.target.value)}
          name="title"
          id={`title-${title}`}
        >
          <option value="Mr.">Mr</option>
          <option value="Mrs.">Mrs</option>
        </select>
        <br />
        <label htmlFor={`name-${title}`}>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          id={`name-${title}`}
          onChange={handelInputChange}
        />
        <br />
        <label htmlFor={`email-${title}`}>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id={`email-${title}`}
          onChange={handelInputChange}
        />
        <br />
        <label htmlFor={`phone-${title}`}>Phone:</label>
        <br />
        <input
          type="tel"
          name="phone"
          id={`phone-${title}`}
          onChange={handelInputChange}
        />
        <br />
        <label htmlFor={`image-${title}`}>Upload Photo:</label>
        <br />
        <input
          type="file"
          name="image"
          id={`image-${title}`}
          onChange={handelInputFileChange}
        />
        <br />
      </fieldset>
    </>
  );
}
