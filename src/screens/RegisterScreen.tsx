import React, { useState } from 'react';
import { Button, Input, Card } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Camera, Upload } from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  key?: React.Key;
}

export const RegisterScreen = ({ onBack, onComplete }: RegisterScreenProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', cpf: '', birthDate: '', email: '', phone: '',
    cep: '', street: '', number: '', complement: '', city: '', state: '',
    password: '', confirmPassword: '', pin: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => step > 1 ? setStep(s => s - 1) : onBack();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-kactus-dark">Dados Pessoais</h3>
            <Input label="Nome Completo" name="name" value={formData.name} onChange={handleChange} placeholder="Como no documento" />
            <Input label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" />
            <Input label="Data de Nascimento" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
            <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" />
            <Input label="Telefone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(00) 00000-0000" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-kactus-dark">Endereço</h3>
            <Input label="CEP" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" />
            <Input label="Rua" name="street" value={formData.street} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Número" name="number" value={formData.number} onChange={handleChange} />
              <Input label="Complemento" name="complement" value={formData.complement} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Cidade" name="city" value={formData.city} onChange={handleChange} />
              <Input label="Estado" name="state" value={formData.state} onChange={handleChange} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-kactus-dark">Segurança</h3>
            <Input label="Criar Senha" name="password" type="password" value={formData.password} onChange={handleChange} />
            <Input label="Confirmar Senha" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
            <Input label="PIN de 4 dígitos" name="pin" type="password" maxLength={4} value={formData.pin} onChange={handleChange} placeholder="0000" />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-kactus-dark">Verificação</h3>
            <div className="space-y-4">
              <div className="p-6 border-2 border-dashed border-black/10 rounded-2xl flex flex-col items-center gap-3 hover:border-kactus-green/50 transition-colors cursor-pointer">
                <Upload className="text-kactus-green" size={32} />
                <div className="text-center">
                  <p className="font-bold text-sm">Documento (RG ou CNH)</p>
                  <p className="text-xs text-kactus-dark/40">Frente e Verso</p>
                </div>
              </div>
              <div className="p-6 border-2 border-dashed border-black/10 rounded-2xl flex flex-col items-center gap-3 hover:border-kactus-green/50 transition-colors cursor-pointer">
                <Camera className="text-kactus-green" size={32} />
                <div className="text-center">
                  <p className="font-bold text-sm">Selfie de Validação</p>
                  <p className="text-xs text-kactus-dark/40">Olhe para a câmera</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-kactus-green/10 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="text-kactus-green" size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-kactus-dark">Tudo pronto!</h3>
              <p className="text-kactus-dark/60">Sua conta está sendo analisada e em breve você terá acesso ao Kactus Bank.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-kactus-bg-light p-6 pb-20 flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <button onClick={prevStep} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? 'bg-kactus-green' : 'bg-black/10'}`} />
          ))}
        </div>
        <div className="w-10" />
      </header>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="mt-8">
        {step < 5 ? (
          <Button onClick={nextStep} className="w-full py-4 text-lg">
            {step === 4 ? 'Finalizar Cadastro' : 'Continuar'}
          </Button>
        ) : (
          <Button onClick={() => onComplete(formData)} className="w-full py-4 text-lg">
            Ir para o Login
          </Button>
        )}
      </footer>
    </div>
  );
};
