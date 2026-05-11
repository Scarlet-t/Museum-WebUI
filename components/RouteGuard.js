import { isAuthenticated } from '@/lib/authenticate';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom} from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];



export default function RouteGuard(props) {
    const router = useRouter();
    const [authorised, setAuthorised] = useState(false);
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(favouritesAtom);

    async function updateAtoms() {
        setFavourites(getFavourites());
        setSearchHistory(getHistory());
    }

    useEffect(() => {
        async function updateAtoms() {
            setFavourites(getFavourites());
            setSearchHistory(getHistory());
        }
        function authCheck(url) {
            const path = url.split('?')[0];
            // if not authenticated and not tryna get to a public path
            if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
                setAuthorised(false);
                console.log(`trying to request a secure path: ${path}`);
                router.push('/login');
            }
            else {
                setAuthorised(true);
            }
        }
        updateAtoms();
        authCheck(router.pathname);

        // adds event listener for event routeChangeComplete, when this happens authcheck is run
        router.events.on('routeChangeComplete', authCheck);

        //removes old event listener when route changes or of component unmounts
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [router, setSearchHistory, setFavourites]);



    return <>{props.children}</>
  }