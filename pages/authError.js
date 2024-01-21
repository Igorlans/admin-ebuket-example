import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import {useRouter} from "next/navigation";


function AuthErrorPage() {
    const router = useRouter()
    return (
        <div style={{
            height: '90vh',
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                fontSize: 30,
                fontWeight: 500
            }}>
                У вас немає доступу до цієї сторінки
            </div>
            <div>
            <Image src={'assets/icons/authError.svg'} alt={'auth error'} width={400} height={400} />
            </div>
            <div style={{
                display: 'flex',
                gap: 25,
            }}>
                <Button variant={'outlined'} onClick={() => router.back()}>
                    Назад
                </Button>
                <Button onClick={() => router.push('/')}>
                    На головну
                </Button>
            </div>
        </div>
    )
}

export default AuthErrorPage;
