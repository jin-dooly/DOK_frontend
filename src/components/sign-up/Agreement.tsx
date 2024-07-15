import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const PersonInformation = () => {
  return (
    <Accordion sx={{ width: '57%' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>(필수)개인정보처리방침</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          개인정보처리방침의 의의 DogWalk는 본 개인정보처리방침은 개인정보보호법 기준으로 작성하되, DogWalk 내에서의 이용자 개인정보 처리 현황을 최대한 알기 쉽고 상세하게 설명하기
          위해 노력하였습니다. 이는 쉬운 용어를 사용한 개인정보처리방침 작성 원칙인 ‘Plain Language Privacy Policy(쉬운 용어를 사용한 개인정보처리방침)’를 도입한 것입니다.
          개인정보처리방침은 다음과 같은 중요한 의미를 가지고 있습니다. DogWalk가 어떤 정보를 수집하고, 수집한 정보를 어떻게 사용하며, 필요에 따라 누구와 이를 공유(‘위탁 또는
          제공’)하며, 이용목적을 달성한 정보를 언제・어떻게 파기하는지 등 ‘개인정보의 한살이’와 관련한 정보를 투명하게 제공합니다. 정보주체로서 이용자는 자신의 개인정보에 대해 어떤
          권리를 가지고 있으며, 이를 어떤 방법과 절차로 행사할 수 있는지를 알려드립니다. 또한, 법정대리인(부모 등)이 만14세 미만 아동의 개인정보 보호를 위해 어떤 권리를 행사할 수
          있는지도 함께 안내합니다. 개인정보 침해사고가 발생하는 경우, 추가적인 피해를 예방하고 이미 발생한 피해를 복구하기 위해 누구에게 연락하여 어떤 도움을 받을 수 있는지
          알려드립니다. 그 무엇보다도, 개인정보와 관련하여 DogWalk와 이용자간의 권리 및 의무 관계를 규정하여 이용자의 ‘개인정보자기결정권’을 보장하는 수단이 됩니다.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export const TrilateralAgreement = () => {
  return (
    <Accordion sx={{ width: '57%' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>(필수)제3자 정보제공 동의</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          「정보통신망 이용촉진 및 정보보호 등에 관한 법률」은 요금정산을 위해 필요한 경우나 다른 법률에 특별한 규정이 있는 경우를 제외하고 정보통신서비스제공자가 개인정보를
          제3자에게 제공한다는 사실을 이용자에게 미리 알리고 동의를 받은 경우에만 그 개인정보를 제3자에게 제공할 수 있도록 하고 있습니다. 또한, 정보통신서비스제공자나 그로부터
          이용자의 개인정보를 제공받은 사람이 이용자의 개인정보 수집ㆍ보관ㆍ처리 등의 업무를 제3자에게 위탁하려는 경우에도 이용자에게 알리고 동의를 받도록 하고 있습니다.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
