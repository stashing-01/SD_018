export const generateAssistantResponse = (question) => {
    const lower = question.toLowerCase();
    if (lower.includes('which gpu') || lower.includes('recommend')) {
      return "I'd recommend an A100 for large model training or an A10G for inference.";
    } else if (lower.includes('cost') || lower.includes('price')) {
      return "A100s are $3–4/hr, H100s are $7–8/hr, and A10Gs are ~$0.60/hr.";
    } else if (lower.includes('compare') || lower.includes('difference')) {
      return "H100s offer highest performance. A100s are balanced. A30s and A10Gs are cost-effective.";
    }
    return "I can help with GPU selection, pricing, and workload matching. Ask me anything!";
  };
  