import Container from '../ui/Container';
import FooterLinks from './FooterLinks';

// TODO: Change Aeste Blog to logo image

export default function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <div className="mx-auto h-10 w-auto text-center">AesteBlog</div>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <FooterLinks />
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Aesteria. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
