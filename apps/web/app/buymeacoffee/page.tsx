import { Card } from '@mantine/core';

const Page: React.FC = () => {
  return (
    <Card
      withBorder
      mx='auto'
      w='fit-content'
      my='md'
      radius='xl'
      bd='solid 2px gray'
    >
      <iframe
        src='https://nowpayments.io/embeds/donation-widget?api_key=8DS4R17-7DJ44MV-G0DVEM4-715WMV8&source=lk_donation&medium=referral'
        style={{
          overflow: 'hidden',
          border: 0,
        }}
        width={354}
        height={680}
      />
    </Card>
  );
};
export default Page;
