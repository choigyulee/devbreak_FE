import styled from "@emotion/styled";


const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>

        <Favicon src="image/favicon.ico" alt="Favicon" />
        <FooterCopyright>Copyright © 2024 devBreak | Catch Errorping. All rights reserved.</FooterCopyright>
        
        <FooterLinks>
          <Link href="#" target="_blank">
          Terms</Link>
          <Link href="#" target="_blank">
          Privacy</Link>
          <Link href="#">Security</Link>
        </FooterLinks>

        <From>South Korea</From>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;


const FooterWrapper = styled.footer`
  width: 100%;
  padding: 35px 0 10px 0; // 제일 첫 번째 값 키우면 더 아래로 내려감
  bottom: 0;
  font-family: "Pretendard";
  font-size: 10px;
  color: #6e7781;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  margin-top: 40px;
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1vw;
`;

const Favicon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const FooterCopyright = styled.span`
  margin-right: 5vw;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 40px;
  margin: 0 5vw 0 0.4vw;
`;

const Link = styled.a`
  color: #6e7781;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const From = styled(FooterCopyright)`
    margin-left: 5vw;
    margin-right: 0;
`