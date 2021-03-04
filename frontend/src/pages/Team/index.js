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
  { firstname: "Harry", lastname: "Potter", bio: "I like magic and french fries. I have glasses and a scar in the shape of a lightning bolt", img: "" },
  { firstname: "Hermione", lastname: "Granger", bio: "Wengardium leviosa!", img: "" },
  { firstname: "Ron", lastname: "Weisley", bio: "I have red hair, well more like an orange.", img: "" },
];

const members = [
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." },
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. " },
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." },
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." },
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. " },
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." },
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." },
];

const Team = () => {
  const [activeMember, setActiveMember] = useState({});
  const [openMemberModal, setOpenMemberModal] = useState(false);

  const handleMemberClick = (member) => {
    console.log(member);
    setActiveMember(member);
    setOpenMemberModal(true);
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
                <Image 
                  onClick={() => { handleMemberClick(admin); }}
                  centered
                  circular
                  src={defaultProfilePicURL}
                  size="medium" 
                  className="member-profile-pic"
                  />
                <div className="member-info-container">
                  <h2>{admin.firstname + " " + admin.lastname}</h2>
                  <p className="member-headline">4th Year Student</p>
                  <p className="member-bio">
                    {admin.bio}
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
                <Image
                  size="medium"
                  centered
                  circular
                  src={defaultProfilePicURL}
                  onClick={() => { handleMemberClick(member); }}
                  className="member-profile-pic"
                />
                <div className="member-info-container">
                  <h2>{member.firstname + " " + member.lastname}</h2>
                  <p className="member-headline">4th Year Student</p>
                  <p className="member-bio">
                    {member.bio}
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
      <Modal
        id="member-modal"
        onClose={() => setOpenMemberModal(false)}
        onOpen={() => setOpenMemberModal(true)}
        open={openMemberModal}
        size="tiny"
      >
        <Modal.Content>
          <Modal.Description>
            <Image
              size="small"
              src={defaultProfilePicURL}
              wrapped
            />
            <h1>{activeMember.firstname + " " + activeMember.lastname}</h1>
            <p className="member-headline">4th Year Student</p>
            <p>{activeMember.bio}</p>
            <p>Check me out on social media!</p>
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
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cool Beans"
            labelPosition='right'
            icon='thumbs up outline'
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
