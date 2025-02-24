'use client';

const Page: React.FC = () => {
  return (
    <>
      <iframe
        // eslint-disable-next-line @eslint-react/dom/no-unsafe-iframe-sandbox
        sandbox='allow-scripts allow-same-origin'
        src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ3PfJSPEIhVxZMG6O_ZNG4AEXWnPZri8_Enaj_C_Lb0FeoUp-xqS71zck_Go-Synn4nD6tw_AeP?gv=true'
        style={{
          border: 0,
          width: '100%',
          height: 'calc(100dvh-var(--app-shell-header-height))',
        }}
      />
    </>
  );
};

export default Page;
