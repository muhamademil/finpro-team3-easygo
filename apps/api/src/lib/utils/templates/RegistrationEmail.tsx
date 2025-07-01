import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

type Props = {
  completeUrl: string;
};

export const RegistrationEmail = ({ completeUrl }: Props) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Verifikasi Akun EasyGo</Preview>
        <Container>
          {/* Logo */}
          <Section style={logo}>
            <Img
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750169793/LogoBlack_roqf28.png"
              alt="EasyGo logo"
              style={{ maxWidth: 120, margin: '0 auto' }}
            />
          </Section>

          {/* Header Image */}
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750169794/BG-emailregister_jgqulc.png"
                alt="EasyGo email header"
              />
            </Row>

            {/* Main Content */}
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 5,
                  }}
                >
                  Hi, Selamat Datang di EasyGo!
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >
                  Akun kamu hampir siap digunakan.
                </Heading>

                <Text style={paragraph}>
                  Sebelum kamu bisa mulai menikmati semua fitur EasyGo, yuk
                  verifikasi email kamu terlebih dahulu dengan klik tombol di
                  bawah ini:
                </Text>

                {/* Button */}
                <Link href={completeUrl}>
                  <Row style={{ ...boxInfos, paddingTop: '0' }}>
                    <Column style={buttonContainer} colSpan={2}>
                      <Button style={button}>Verifikasi Sekarang</Button>
                    </Column>
                  </Row>
                </Link>

                {/* Features List */}
                <Text style={{ ...paragraph, marginTop: 25 }}>
                  Setelah verifikasi, kamu bisa langsung mengakses berbagai
                  fitur yang kami sediakan:
                </Text>
                <Text style={listText}>
                  🔓 Kelola profil dan informasi akunmu <br />
                  🏡 Jelajahi atau kelola properti dengan mudah <br />
                  💬 Pantau notifikasi, pesan, dan riwayat aktivitas <br />
                  🎁 Dapatkan akses ke penawaran dan fitur eksklusif
                </Text>

                {/* Footer Note */}
                <Text style={{ ...caption, marginTop: 20 }}>
                  Kami ingin memastikan pengalamanmu bersama EasyGo selalu aman,
                  nyaman, dan menyenangkan — baik sebagai traveller maupun
                  tenant. Kalau butuh bantuan, tim support kami siap membantu
                  kapan saja. Sampai jumpa di EasyGo!
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Footer Image */}
          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750169804/Screenshot_2025-06-17_at_21.14.41_id4qq9.png"
              alt="Easygo Footer"
            />
          </Section>

          {/* Legal Footer */}
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2025 | EasyGo Inc., Jl Sudirman Kav.34, Jakarta, 13250, I.D |
            www.easygo.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationEmail;

// Styles
const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
  lineHeight: '1.6',
};

const caption = {
  fontSize: 12,
  color: '#555',
  lineHeight: '1.5',
};

const listText = {
  fontSize: 16,
  lineHeight: '1.8',
  marginTop: 10,
};

const logo = {
  padding: '30px 20px',
  textAlign: 'center' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: 20,
};

const button = {
  backgroundColor: '#2639C8',
  borderRadius: 8,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  display: 'inline-block',
  padding: '12px 30px',
  textDecoration: 'none',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};
