import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

// Undo the wrong placement
code = code.replace(
  '    setIsSubmitting(false);\n  const totalPages = Math.ceil(total / limit);',
  '  const totalPages = Math.ceil(total / limit);'
);

// Put it inside finally block in handleSubmit
const handleSubmitCode = `    } catch (error) {
      console.error(error);
    }
  };`;
const handleSubmitReplacement = `    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };`;

code = code.replace(handleSubmitCode, handleSubmitReplacement);

fs.writeFileSync(file, code);
