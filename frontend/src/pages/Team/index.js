import React, { useState } from "react";
import {
  Container,
  Grid,
  Image,
  Icon,
  Modal,
  Button
}
  from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";


import './index.css';

const defaultProfilePicURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";

const admins = [
  { firstname: "", lastname: "", bio: "", img: "" },
  { firstname: "", lastname: "", bio: "", img: "" },
  { firstname: "", lastname: "", bio: "", img: "" },
];

const members = [
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },
  { firstname: "", lastname: "", bio: "" },

  { firstname: "", lastname: "", bio: "" },
];

const Team = () => {
  const [openMemberModal, setOpenMemberModal] = useState(false);

  const handleMemberClick = (member) => {
    console.log(member);
    console.log("oop");
    console.log(this);
  }
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>Meet the Admins</h1>
          <Grid columns="4" stackable centered doubling>
            {admins.map((admin, id) =>
              <Grid.Column key={`admin-${id}`}>
                <Image onClick={() => { handleMemberClick(admin); }}
                  centered
                  circular
                  src={defaultProfilePicURL}
                  size="medium" />
                <div className="member-info-container">
                  <h2>Jiheui Lee </h2>
                  <p className="member-headline">4th Year Student</p>
                  <p className="member-bio">
                    Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci. Donec neque erat, cursus sed erat a, dapibus posuere tellus. Donec non lectus aliquet, sodales arcu in, efficitur lacus.
                    </p>
                  <div className="member-media-links">
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="linkedin"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="github"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="facebook"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="instagram"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="twitter"></Icon>
                    </a>
                  </div>
                </div>
              </Grid.Column>
            )}
          </Grid>
          <h1>Meet the Members</h1>
          <Grid columns="4" stackable centered doubling>
            {members.map((member, id) =>
              <Grid.Column key={`member-${id}`}>
                <Image size="medium" centered circular src={defaultProfilePicURL} />
                <div className="member-info-container">
                  <h2>Daniel</h2>
                  <p className="member-headline">4th Year Student</p>
                  <p className="member-bio">
                    Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci. Donec neque erat, cursus sed erat a, dapibus posuere tellus. Donec non lectus aliquet, sodales arcu in, efficitur lacus.
                    </p>
                  <div className="member-media-links">
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="linkedin"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="github"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="facebook"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="instagram"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="">
                      <Icon size="large" name="twitter"></Icon>
                    </a>
                  </div>
                </div>
              </Grid.Column>
            )}
          </Grid>
        </ContentContainer>
      </Container>
      <Modal>
        <Modal.Header>Member Info Modal</Modal.Header>
        <Modal.Content>Stuff goes here</Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpenMemberModal(false)}>
            Nope
        </Button>
          <Button
            content="Yep, that's me"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpenMemberModal(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
      <Footer />
    </>
  );
};

export default Team;
