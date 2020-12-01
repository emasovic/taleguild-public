import { useRouter } from "next/router";

export default function Redirect({ url }) {
  const router = useRouter();

  return (
    <>
      <div>
        Human validation
        <div
          style={{ background: "red", cursor: "pointer" }}
          onClick={() => router.push(url)}
        >
          click here
        </div>
      </div>
    </>
  );
}
