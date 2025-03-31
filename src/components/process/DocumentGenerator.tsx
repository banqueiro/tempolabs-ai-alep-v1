import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, Plus, Trash2 } from "lucide-react";

interface DocumentGeneratorProps {
  processId?: string;
  processType?: string;
  availableTemplates?: {
    id: string;
    name: string;
    type: string;
    description: string;
  }[];
  onGenerateDocument?: (
    templateId: string,
    customFields: Record<string, string>,
  ) => void;
}

const DocumentGenerator = ({
  processId = "PROC-2023-0042",
  processType = "Dispensa de Licitação",
  availableTemplates = [
    {
      id: "template-1",
      name: "Termo de Referência",
      type: "termo-referencia",
      description:
        "Documento inicial que define o objeto e condições da contratação",
    },
    {
      id: "template-2",
      name: "Estudo Técnico Preliminar",
      type: "estudo-tecnico",
      description: "Análise técnica que fundamenta a solução escolhida",
    },
    {
      id: "template-3",
      name: "Parecer Jurídico",
      type: "parecer-juridico",
      description: "Análise jurídica do processo conforme Lei 14133/2021",
    },
    {
      id: "template-4",
      name: "Minuta de Contrato",
      type: "minuta-contrato",
      description: "Modelo de contrato a ser firmado com o fornecedor",
    },
  ],
  onGenerateDocument = () => {},
}: DocumentGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customFields, setCustomFields] = useState<Record<string, string>>({
    objeto: "",
    justificativa: "",
    valor: "",
  });
  const [additionalFields, setAdditionalFields] = useState<string[]>([]);

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, ""]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...additionalFields];
    newFields.splice(index, 1);
    setAdditionalFields(newFields);
  };

  const handleFieldChange = (field: string, value: string) => {
    setCustomFields({
      ...customFields,
      [field]: value,
    });
  };

  const handleAdditionalFieldChange = (index: number, value: string) => {
    const newFields = [...additionalFields];
    newFields[index] = value;
    setAdditionalFields(newFields);
  };

  const handleGenerateDocument = () => {
    // Convert additional fields to the customFields object
    const additionalFieldsObj: Record<string, string> = {};
    additionalFields.forEach((field, index) => {
      if (field) {
        additionalFieldsObj[`campo_adicional_${index + 1}`] = field;
      }
    });

    onGenerateDocument(selectedTemplate, {
      ...customFields,
      ...additionalFieldsObj,
    });
  };

  const selectedTemplateData = availableTemplates.find(
    (template) => template.id === selectedTemplate,
  );

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Gerador de Documentos
        </CardTitle>
        <CardDescription>
          Gere documentos padronizados para o processo {processId} (
          {processType})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="template"
            className="text-sm font-medium text-gray-700"
          >
            Selecione o modelo de documento
          </label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger id="template" className="w-full">
              <SelectValue placeholder="Selecione um modelo" />
            </SelectTrigger>
            <SelectContent>
              {availableTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTemplateData && (
            <p className="text-sm text-gray-500 italic">
              {selectedTemplateData.description}
            </p>
          )}
        </div>

        {selectedTemplate && (
          <>
            <div className="pt-2">
              <h3 className="text-md font-medium mb-2">Campos do documento</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="objeto"
                    className="text-sm font-medium text-gray-700"
                  >
                    Objeto
                  </label>
                  <Input
                    id="objeto"
                    placeholder="Descreva o objeto da contratação"
                    value={customFields.objeto}
                    onChange={(e) =>
                      handleFieldChange("objeto", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="justificativa"
                    className="text-sm font-medium text-gray-700"
                  >
                    Justificativa
                  </label>
                  <Input
                    id="justificativa"
                    placeholder="Justificativa para a contratação"
                    value={customFields.justificativa}
                    onChange={(e) =>
                      handleFieldChange("justificativa", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="valor"
                    className="text-sm font-medium text-gray-700"
                  >
                    Valor Estimado (R$)
                  </label>
                  <Input
                    id="valor"
                    placeholder="0,00"
                    value={customFields.valor}
                    onChange={(e) => handleFieldChange("valor", e.target.value)}
                  />
                </div>

                {/* Additional dynamic fields */}
                {additionalFields.map((field, index) => (
                  <div key={index} className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        placeholder={`Campo adicional ${index + 1}`}
                        value={field}
                        onChange={(e) =>
                          handleAdditionalFieldChange(index, e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveField(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddField}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar campo
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Visualizar
        </Button>
        <Button onClick={handleGenerateDocument} disabled={!selectedTemplate}>
          <Download className="h-4 w-4 mr-2" />
          Gerar Documento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentGenerator;
