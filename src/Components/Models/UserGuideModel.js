import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function UserGuide(props) {
  
  return (
    <>
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{width:"100%"}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How to generate App password for your Email are shown:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4>Follow these steps to generate an App Password:</h4>
        <ol>
          <li>Go to <a href="https://myaccount.google.com">https://myaccount.google.com</a></li>
          <li>Click on <b>Security</b> in the left sidebar.</li>
          <li>Under "Signing in to Google", click on <b>2-Step Verification</b>.</li>
          <li>Enter your password and complete the two-step verification process.</li>
          <li>Return to the <a href="https://myaccount.google.com/security">https://myaccount.google.com/security</a> page.</li>
          <li>Scroll down to "Signing in to Google" and click on <b>App passwords</b>.</li>
          <li>Choose the app or device type you want to generate the app password for (e.g., "Bulk Email").</li>
          <li>Click on <b>Generate</b>.</li>
          <li>Copy the 12-digit app password generated and paste it into the password field in our website settings.</li>
          <li>Finally, compose and send emails using your email ID set in the settings.</li>
        </ol>
        <h4>Video Tutorial:</h4>
        <iframe title='Video Tutorial' src="https://drive.google.com/file/d/1c06YYYKA1nUOfbdRYUPzq9nHYLfkyzTR/preview" width="100%" height="480" allow="autoplay" ></iframe>
        <br />
        <br />
        <h4>Notes:</h4>
        <ul>
          <li>This tutorial is for Gmail users only.</li>
          <li>If you are using another email service, follow similar steps to generate an app password in your email provider's settings.</li>
          <li>You can delete and update these settings whenever you want.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>props.onHide()}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}


export default UserGuide