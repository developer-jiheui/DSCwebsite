import React, { useState, useEffect} from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentContainer from "../../components/ContentContainer";

import {
  Container,
  Grid,
  Image,
  Icon,
  Modal,
  Button
} from "semantic-ui-react";

import './index.css';

const defaultProfilePicURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";



// const stubAllMembers = [
//   {
//     firstname: "Jiheui", lastname: "Lee", bio: "I like magic and french fries. I have glasses and a scar in the shape of a lightning bolt",
//     admintype: "President", faculty: "CSIS", img: "images/Profiles/Jiheui.jpeg", icon: "chess queen icon"
//   },
//   {
//     firstname: "Nancy", lastname: "Lakhanpal", bio: "Wengardium leviosa!",
//     admintype: "Vice President", faculty: "PDICT", img: "images/Profiles/Nancy.jpeg", icon: "chess king icon"
//   },
//   {
//     firstname: "Mikhail", lastname: "Chumakov", bio: "I have red hair, well more like an orange.",
//     admintype: "Secretary", faculty: "CSIS", img: "images/Profiles/Mikhail.jpeg", icon: "chess knight icon"
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   },
//   {
//     firstname: "First", lastname: "Last", bio: "Quisque pharetra nisi nec ex aliquet pellentesque. Aliquam sit amet risus aliquam, sagittis odio at, convallis orci."
//     , faculty: "CSIS", img: defaultProfilePicURL
//   }
// ];


const Team = () => {
  const [users, setUsers] = useState([]);
  const [activeMember, setActiveMember] = useState({});
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [admins, setAdmins] =useState([]);
  const [members, setMembers] =useState([]);

  useEffect(() => {
    // fetch all the featured news
    fetch("http://localhost:5000/user", {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaton/json'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setUsers(data);
        setAdmins(data.filter(m =>m.isExec))
        setMembers(data.filter(m =>!m.isExec))

      }).catch(error => {
        // in case there's a terrible error
        // could use some refining
        alert("Oops! user upssu :s");
        console.log(error);
      });

  }, []);

  

  const handleMemberClick = (member) => {
    console.log(member);
    setActiveMember(member);
    setOpenMemberModal(true);
  }

  const MemberCard = ({ member, key }) => {
    return (
      <Grid.Column className="profile-card" key={`member-${key}`} onClick={() => { handleMemberClick(member); }}>
        <div class="profile-hover-div">
          <div class="profile-hover-text">Learn More about me</div>
        </div>
        <Image
          centered
          circular
          //src={defaultProfilePicURL}
           src={member.avatar||defaultProfilePicURL}
          size="medium"
          className="member-profile-pic"
        />
        <div className="member-info-container">
          <h2>{member.firstName + " " + member.lastName}</h2>
          {member.isExec &&
            <p className="member-type">
              {/* {member.admintype}
              <Icon color={member.color} name={member.icon} /> */}
            </p>
          }
          <p className="member-headline">{member.program}</p>
        </div>
      </Grid.Column>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <h1>EXECUTIVES</h1>
          <Grid columns="4" stackable centered doubling>
            {admins.length>0&&admins.map((member, index) =>
              <MemberCard member={member} key={index}></MemberCard>
            )}
          </Grid>
          <h1>MEET THE TEAM</h1>
          <Grid columns="4" stackable centered doubling >
            {members.length>0&&members.map((member, index) =>
              <MemberCard member={member} key={index}></MemberCard>
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
             //src={defaultProfilePicURL}
              src={activeMember.avatar}
              wrapped
            />
            <h1>{activeMember.firstName + " " + activeMember.lastName}</h1>
            <p className="member-headline">{activeMember.program}</p>
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
            className="profile-button"
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
