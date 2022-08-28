import { RiContactsFill } from "react-icons/ri";
import { useState } from "react";

import "./styles.scss";
import PageHeaderContent from "../../components/pageHeaderContent/index";
import ErrorModal from "../../components/ErrorModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

const Contact = () => {
  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [textAreaDescription, setTextAreaDescription] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const sendEmails = async () => {
    const dataObject = {
      name: inputName,
      email: inputEmail,
      description: textAreaDescription,
    };
    try {
      await sendRequest("/email/inquiry", dataObject);
      await sendRequest("/email/confirmation", dataObject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <section id="contact" className="contact">
        <PageHeaderContent
          headerText="Contact Me"
          icon={<RiContactsFill size={40} />}
        />
        <div className="contact__content">
          <h3 className="contact__content__header-text">Let's Talk</h3>

          <div className="contact__content__form">
            <div className="contact__content__form__controlsWrapper">
              <div className="nameWrapper">
                <input
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  name="name"
                  type="text"
                  className="inputName"
                />
                <label htmlFor="name" className="nameLabel">
                  Name
                </label>
              </div>

              <div className="emailWrapper">
                <input
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  name="email"
                  type="text"
                  className="inputEmail"
                />
                <label htmlFor="email" className="emailLabel">
                  Email
                </label>
              </div>

              <div className="descriptionWrapper">
                <textarea
                  value={textAreaDescription}
                  onChange={(e) => setTextAreaDescription(e.target.value)}
                  name="description"
                  type="text"
                  className="inputDescription"
                  rows={5}
                  style={{ resize: "none" }}
                />
                <label htmlFor="description" className="descriptionLabel">
                  Description
                </label>
              </div>
            </div>
            <button onClick={() => sendEmails()}>Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
