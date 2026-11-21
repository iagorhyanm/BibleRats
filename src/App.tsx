import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  return (
    <main className="container">
      <h1>BibleRats</h1>
      <AuthLoading>
        <p>Carregando…</p>
      </AuthLoading>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      <Authenticated>
        <Home />
      </Authenticated>
    </main>
  );
}

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="card"
      onSubmit={(event) => {
        event.preventDefault();
        setError(null);
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        formData.set("flow", flow);
        signIn("password", formData)
          .catch(() => {
            setError(
              flow === "signIn"
                ? "E-mail ou senha inválidos."
                : "Não foi possível criar a conta (a senha precisa ter 8+ caracteres).",
            );
          })
          .finally(() => setSubmitting(false));
      }}
    >
      <h2>{flow === "signIn" ? "Entrar" : "Criar conta"}</h2>
      <input name="email" type="email" placeholder="E-mail" autoComplete="email" required />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        autoComplete={flow === "signIn" ? "current-password" : "new-password"}
        minLength={8}
        required
      />
      <button type="submit" disabled={submitting}>
        {flow === "signIn" ? "Entrar" : "Cadastrar"}
      </button>
      {error && <p className="error">{error}</p>}
      <button
        type="button"
        className="link"
        onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
      >
        {flow === "signIn" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
      </button>
    </form>
  );
}

function Home() {
  const { signOut } = useAuthActions();
  const viewer = useQuery(api.users.viewer);

  return (
    <div className="card">
      <p>
        Logado como <strong>{viewer?.email ?? "…"}</strong>
      </p>
      <button onClick={() => void signOut()}>Sair</button>
    </div>
  );
}
