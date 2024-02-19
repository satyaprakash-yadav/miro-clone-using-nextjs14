import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
  secret: "sk_dev_SvozVGXBSgbUKHUTlSv_MA_mDGcFN6G7VTf9cXLiaOuTo1deACpUkNIYVkyYQZpk",
});

export async function POST(req: Request) {
    // Get the current user from your database
    const authorization = await auth();
    const user = await currentUser();

    if (!authorization || !user) {
        return new Response("Unauthorized", {status: 403});
    }

    // Implement your own security, and give the user access to the room
    const {room} = await req.json();
    const board = await convex.query(api.board.get, {id: room});

    if (board?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", {status: 403})
    }

    const userInfo = {
        name: user.firstName!,
        picture: user.imageUrl!,
    }


    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const {status, body} = await session.authorize();
    return new Response(body, {status});
}
