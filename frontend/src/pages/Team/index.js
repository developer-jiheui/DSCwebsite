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
// const defaultProfilePicURL = "images/Profiles/Jiheui.jpeg";

const admins = [
  { firstname: "Jiheui", lastname: "Lee", bio: "I like magic and french fries. I have glasses and a scar in the shape of a lightning bolt", 
  admintype:"President",faculty:"CSIS", img: "images/Profiles/Jiheui.jpeg", icon:"chess queen icon"},
  { firstname: "Nancy", lastname: "Lakhanpal", bio: "Wengardium leviosa!", 
  admintype:"Vice President",faculty:"PDICT", img: "images/Profiles/Nancy.jpeg", icon:"chess king icon"},
  { firstname: "Mikhail", lastname: "Chumakov", bio: "I have red hair, well more like an orange.", 
  admintype:"Secretary",faculty:"CSIS", img: "images/Profiles/Mikhail.jpeg", icon:"chess knight icon"},
];

const members = [
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL},
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL},
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL},  
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL},
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL},
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL},
  { firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci." 
  ,faculty:"CSIS", img: defaultProfilePicURL}
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
          <h1>EXECUTIVES</h1>
          <Grid columns="4" stackable centered doubling>
            {admins.map((admin, id) =>
              <Grid.Column className="profile-card" key={`admin-${id}`}  onClick={() => { handleMemberClick(admin); }}>
              <div class="profile-hover-div">
                <div class="profile-hover-text">Learn More about me</div>
                </div>       
                <Image 
                  centered
                  circular
                  src={admin.img}
                  size="medium" 
                  className="member-profile-pic"
                  />
                <div className="member-info-container">
                  <h2>{admin.firstname + " " + admin.lastname}</h2>
                  <p className="member-type">{admin.admintype} <Icon color={admin.color} name={admin.icon}></Icon></p>
                  <p className="member-headline">{admin.faculty}</p>
                  {/* <p className="member-bio">
                    {admin.bio}
                  </p>
                  <div className="member-media-links">
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="linkedin"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="github"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="globe icon"></Icon>
                    </a>
                  </div> */}
                </div>
              </Grid.Column>
            )}
          </Grid>
          <h1>MEET THE TEAM</h1>
          <Grid columns="4" stackable centered doubling >
            {members.map((member, id) =>
              <Grid.Column key={`member-${id}`} className="profile-card">
                <div class="profile-hover-div">
                <div class="profile-hover-text">Learn More about me</div>
                </div>       
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
                  <p className="member-headline">{member.faculty}</p>
                  {/* <p className="member-bio">
                    {member.bio}
                  </p>
                  <div className="member-media-links">
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="linkedin"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="github"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="globe icon"></Icon>
                    </a>
                  </div> */}
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
              size="medium"
              circular
              src={activeMember.img}
              wrapped
            />
            <h1>{activeMember.firstname + " " + activeMember.lastname}</h1>
            <p className="member-headline">{activeMember.faculty}</p>
            <p className="member-bio">"{activeMember.bio}"</p>
            <p> <Icon size="small" name="hand point down outline"></Icon>Check me out on social media!</p>
            <div className="member-media-links">
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="linkedin"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="github"></Icon>
                    </a>
                    <a target="_blank" rel="noreferrer"
                      href="#">
                      <Icon size="large" name="globe icon"></Icon>
                    </a>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className = "profile-button"
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
