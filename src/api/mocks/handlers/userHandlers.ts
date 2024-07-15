import { HttpResponse, StrictRequest, delay, http } from 'msw';
import { userUrl as root } from '../../apiUrls';

type userType = {
  _id: string;
  name: string;
};

export const userHandlers = [
  http.get(`${root}/profile/:id`, async ({ params }) => {
    await delay(500);

    const res = await fetch('../data/users.json');
    const users = await res.json();

    const foundUser = users.filter(({ _id }: userType) => _id === params.id);

    if (!foundUser) {
      return HttpResponse.json({ status: 400 });
    }

    return HttpResponse.json({
      data: {
        user: foundUser,
        rating: [5, 1],
        userDogs: [
          {
            _id: '65695ed473dec49636cf2528',
            dogName: '디셈버',
            dogImg: 'https://i.pinimg.com/564x/ac/34/ce/ac34ceb5a851590ebb1e1e4f79ed1310.jpg',
            birth: '01/04/2024',
            dogType: '말티즈',
            gender: 'Male',
            personality: '매우 활발',
            __v: 0,
          },
          {
            _id: '6569f271aab8005b4a817412',
            dogName: 'Jan',
            dogImg: 'https://mblogthumb-phinf.pstatic.net/20141217_12/ilbgs_141878084647178nT5_JPEG/499aa6bcf0053bd14eb6f1ae0e305a95.jpg?type=w800',
            birth: '01/04/2024',
            dogType: '시바견',
            gender: 'Male',
            personality: '매우 활발',
            note: '토종시바에여',
            __v: 0,
          },
          {
            _id: '656a7c1c56903ead922446ae',
            dogName: '순돌이',
            dogImg: 'https://dokawsbucket.s3.ap-northeast-2.amazonaws.com/789e3748c354b0c4fd53aadd3dfdda4b.jpg',
            birth: '2020-01-23',
            dogType: '불독',
            gender: 'male',
            personality: 'calm',
            note: '엄청 귀엽죠? 데려가고 싶죠? 미치겠죠?',
            __v: 0,
          },
        ],
      },
    });
  }),
];
